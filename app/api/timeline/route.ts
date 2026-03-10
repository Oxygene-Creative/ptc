import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Timeline from '@/models/Timeline';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const data = await request.json();

    const uniqueId = nanoid(10);

    const timeline = new Timeline({
      uniqueId,
      projectName: data.projectName,
      clientName: data.clientName,

      // ✅ Fix 1: Map shorthand values to full label strings expected by the model
      schedulingMethod:
        data.schedulingMethod === 'backward'
          ? 'Backward Scheduling'
          : 'Forward Scheduling',

      startDate: data.startDate || undefined,
      endDate: data.endDate || undefined,

      // ✅ Fix 2: Convert comma-separated string to string[] for the model
      holidayDates: Array.isArray(data.holidayDates)
        ? data.holidayDates
        : typeof data.holidayDates === 'string' && data.holidayDates.trim()
          ? data.holidayDates.split(',').map((d: string) => d.trim()).filter(Boolean)
          : [],

      useExtendedWeekends: data.useExtendedWeekends,
      finalDeliveryDate: data.finalDeliveryDate
        ? new Date(data.finalDeliveryDate)
        : undefined,
      globalContingency: data.globalContingency || 0,
      excludeDays: data.excludeDays || false,
      excludeStartDate: data.excludeStartDate || undefined,
      excludeEndDate: data.excludeEndDate || undefined,
      excludeDescription: data.excludeDescription || undefined,

      editorial: data.editorial,
      creative: data.creative,
      design: data.design,
      webDevelopment: data.webDevelopment,
      printProduction: data.printProduction,
    });

    await timeline.save();

    return NextResponse.json({
      success: true,
      uniqueId,
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/?id=${uniqueId}`
    });
  } catch (error: any) {
    console.error('Error saving timeline:', error);

    // ✅ Fix 3: Surface Mongoose validation errors as 400 instead of silent 500
    // This means a bad holiday date like "yebjskdf" will return a readable error message
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e: any) => e.message);
      return NextResponse.json(
        { success: false, error: messages.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to save timeline' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID parameter is required' },
        { status: 400 }
      );
    }

    const timeline = await Timeline.findOne({ uniqueId: id });

    if (!timeline) {
      return NextResponse.json(
        { success: false, error: 'Timeline not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: timeline
    });
  } catch (error) {
    console.error('Error fetching timeline:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch timeline' },
      { status: 500 }
    );
  }
}
