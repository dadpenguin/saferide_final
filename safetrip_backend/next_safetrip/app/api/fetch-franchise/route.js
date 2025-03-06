import { NextResponse } from "next/server";
import { db } from "@/app/utils/db";  // Make sure you're using your db connection correctly
import { collection, query, where, getDocs } from "firebase/firestore";

// Example data array
const dbArray = [
  {
    franchiseNumber: 1214,
    firstName: 'FERDINAND',
    middleInitial: 'CONERAS',
    surname: 'CABO',
    address: 'MAYPANGDAN, BORONGAN, EASTERN SAMAR',
    contactNumber: 9659460600,
    driversLicense: 'H04-06000345', 
    active: true
  },
];

export async function GET(request) {
    
  // Extract franchiseNumber from query params
  const franchiseNumber = request.nextUrl.searchParams.get('franchiseNumber');

  if (!franchiseNumber) {
    return NextResponse.json(
      { message: 'franchiseNumber required' },
      { status: 400 }
    );
  }

  // Find the data in dbArray
  const data = dbArray.find(item => item.franchiseNumber === parseInt(franchiseNumber));

  if (data) {
    return NextResponse.json(data, { status: 200 });
  } else {
    return NextResponse.json({ message: 'data not found' }, { status: 404 });
  }
}
