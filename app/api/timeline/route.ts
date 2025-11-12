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
      ...data,
    });

    await timeline.save();

    return NextResponse.json({
      success: true,
      uniqueId,
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/?id=${uniqueId}`
    });
  } catch (error) {
    console.error('Error saving timeline:', error);
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
