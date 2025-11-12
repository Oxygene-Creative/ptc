# Report / Publication Timeline Calculator

A comprehensive timeline calculator for report and publication projects with support for multiple phases, scheduling modes, and export options.

## Features

- **Backward & Forward Scheduling**: Calculate timelines from a deadline (backward) or from a start date (forward)
- **Working Days Calculation**: Automatically excludes weekends and holidays
- **Multiple Phases**:
  - Editorial & Content Development
  - Creative Development
  - Publication Design & Layout
  - Optional Web Version Development
  - Print Production
- **Export Options**:
  - Copy to Clipboard (text format)
  - Export to PDF
  - Export to Excel (.xlsx)
  - Save & Generate Shareable Link

## Setup

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Configure MongoDB connection in `.env.local`:

```env
MONGODB_URI=mongodb://localhost:27017/timeline-calculator
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

For MongoDB Atlas (cloud), use:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/timeline-calculator?retryWrites=true&w=majority
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Creating a Timeline

1. **Project Overview**: Fill in project title, client name, and scheduling preferences
2. **Select Scheduling Mode**:
   - **Backward**: Start from final delivery date and calculate backwards
   - **Forward**: Start from project start date and calculate forwards
3. **Configure Phases**: Set duration for each phase of the project
4. **Calculate**: Click "Calculate Timeline" to generate the schedule

### Exporting Timelines

- **Copy to Clipboard**: Text format summary for quick sharing
- **Export PDF**: Professional PDF document with project timeline
- **Export Excel**: Spreadsheet format for further analysis
- **Save / Generate Link**: Save to database and get a shareable URL

### Loading Saved Timelines

Saved timelines can be accessed via URL:
```
http://localhost:3000/?id=<unique-id>
```

The application will automatically load the timeline data when the page is accessed with an ID parameter.

## Project Structure

```
├── app/
│   ├── api/
│   │   └── timeline/
│   │       └── route.ts          # API endpoints for saving/loading
│   └── page.tsx                   # Main calculator component
├── lib/
│   └── mongodb.ts                 # MongoDB connection setup
├── models/
│   └── Timeline.ts                # MongoDB schema
├── components/
│   └── ui/                        # shadcn/ui components
└── .env.local                     # Environment configuration
```

## Technologies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **MongoDB & Mongoose** - Database
- **shadcn/ui** - UI components
- **Tailwind CSS** - Styling
- **jsPDF** - PDF generation
- **xlsx** - Excel export
- **nanoid** - Unique ID generation

## Build for Production

```bash
npm run build
npm start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/timeline-calculator` |
| `NEXT_PUBLIC_BASE_URL` | Base URL for shareable links | `http://localhost:3000` |

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

© 2025 Report / Publication Timeline Calculator
