import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({ orderBy: { name: 'asc' } });

  revalidatePath('/issues/[id]/page', 'page');

  return NextResponse.json(users);
}