import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";

//特定ユーザーの購入履歴を取得
export async function GET(
  request: NextRequest,
  context: { params: { userId: string } }
) {
  const { userId } = context.params;
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
