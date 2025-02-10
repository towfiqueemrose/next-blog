// src/app/api/user/route.ts
import { prisma } from '@/lib/client'
import { NextResponse } from 'next/server'

export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}