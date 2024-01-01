import { NextRequest, NextResponse } from 'next/server';
import issueSchema from './issueSchema';
import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description
    }
  });

  revalidatePath('/issues');

  return NextResponse.json(newIssue, { status: 201 });
}