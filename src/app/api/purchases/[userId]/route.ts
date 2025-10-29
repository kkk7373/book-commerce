import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

//特定ユーザーの購入履歴を取得
export async function GET(
  request: Request,
  context: { params: Record<string, string | string[]> }
) {
  const rawUserId = context.params.userId;
  const userId = Array.isArray(rawUserId) ? rawUserId[0] : rawUserId;

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }
  try {
    const purchases = await prisma.purchase.findMany({
      where: {
        userId,
      },
    });
    return NextResponse.json(purchases);
  } catch (err: any) {
    return NextResponse.json(err, { status: 500 });
  }
}
