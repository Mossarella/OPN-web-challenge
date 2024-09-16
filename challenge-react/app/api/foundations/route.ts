import { IPayment } from "@/interfaces/IPayment";
import { jsonData } from "../../../db";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  try {
    const data = await jsonData.charities;
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: Request) {
  try {
    const { charitiesId, amount, currency, id } = await request.json();

    const newPayment: IPayment = {
      charitiesId,
      amount,
      currency,
      id: uuidv4(),
    };

    jsonData.payments.push(newPayment);

    return new Response(JSON.stringify(jsonData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
