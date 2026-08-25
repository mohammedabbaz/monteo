import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Log the received quote request
    console.log("[MONTÉO DEVIS] Nouveau devis reçu :", {
      reference: body.reference,
      name: body.name,
      phone: body.phone,
      email: body.email,
      city: body.city,
      trade: body.trade,
      subOption: body.subOption,
      housing: body.housing,
      urgency: body.urgency,
      estimate: body.estimate?.priceRangeText,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        reference: body.reference,
        message: "Votre demande de devis a été enregistrée avec succès.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[MONTÉO DEVIS ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de l'enregistrement du devis." },
      { status: 500 }
    );
  }
}

