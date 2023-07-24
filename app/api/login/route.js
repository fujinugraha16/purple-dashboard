import { NextResponse } from "next/server"
import axios from "axios"

import getErrorResponse from "@/helpers/get-error-response"

export async function POST(request) {
  try {
    const body = await request.json()

    const { data } = await axios({
      url: 'https://dummyjson.com/auth/login',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
        username: body.username,
        password: body.password,
      })
    })

    const tokenMaxAge = 3600

    const cookieOptions = {
      name: "token",
      value: data.token,
      httpOnly: true,
      path: "/",
      maxAge: tokenMaxAge,
    }

    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        token: data.token,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )

    await Promise.all([
      response.cookies.set(cookieOptions),
      response.cookies.set({
        name: "logged-in",
        value: "true",
        maxAge: tokenMaxAge,
      }),
    ])

    return response
  } catch (err) {
    if ('response' in err && 'status' in err.response && err.response.status === 400) {
      return getErrorResponse(400, err.response.data.message)
    }

    return getErrorResponse(500, err.message)
  }
}