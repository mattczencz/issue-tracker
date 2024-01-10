import { NextRequest, NextResponse } from 'next/server';
import issueSchema from './issueSchema';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({}, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! }
  });

  if (!user)
    return NextResponse.json({ message: 'Could not find user.' }, { status: 404 });

  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
      createdByUserId: user.id,
    }
  });

  return NextResponse.json(newIssue, { status: 201 });
}