import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

//特定ユーザーの購入履歴を取得
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  try {
    const purchases = await prisma.purchase.findMany({
      where: {
        userId: userId,
      },
    });
    return NextResponse.json(purchases);
  } catch (err: any) {
    return NextResponse.json(err, { status: 500 });
  }
}
