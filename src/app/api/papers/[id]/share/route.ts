import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { link } = await request.json();
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection('papers').updateOne(
      { _id: new ObjectId(context.params.id) },
      { 
        $push: { 
          shareableLinks: link 
        }
      }
    );

    if (result.matchedCount === 0) {
      return new NextResponse('Paper not found', { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Share link error:', error);
    return NextResponse.json(
      { error: 'Failed to create share link' },
      { status: 500 }
    );
  }
}
