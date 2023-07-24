const { NextResponse } = require("next/server")

const getErrorResponse = (status = 500, message, errors = null) => {
  return new NextResponse(
    JSON.stringify({
      status: status < 500 ? "fail" : "error",
      message,
      errors: errors ? errors.flatten() : null
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  )
}

export default getErrorResponse