import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(request) {
  const url = request.nextUrl.pathname
  const acc_tkn = request.cookies.get('acc_tkn')?.value
  //const rfsh_tkn = request.cookies.get('rfsh_tkn')?.value
  //const error_tkn = request.cookies.get('error')?.value
  const secret = new TextEncoder().encode('secret')

  // if(url.includes('/home')) {
  //   if(acc_tkn === undefined) {
  //     return NextResponse.redirect(new URL('/', request.url))
  //   }
  //   try {
  //     const { payload } = await jwtVerify(acc_tkn, secret)
  //     console.log(payload)
  //     return NextResponse.next()
  //   } catch (error) {
  //     console.log(error)
  //     return NextResponse.redirect(new URL('/', request.url))
  //   }
  // }

  return NextResponse.next()
}