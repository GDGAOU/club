import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // Increment download count
    const result = await db.collection('papers').updateOne(
      { _id: new ObjectId(params.id) },
      { 
        $inc: { downloads: 1 },
        $set: { updatedAt: new Date() }
      }
    );

    if (result.matchedCount === 0) {
      return new NextResponse('Paper not found', { status: 404 });
    }

    return new NextResponse('Download count updated', { status: 200 });
  } catch (error) {
    console.error('Update download count error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
