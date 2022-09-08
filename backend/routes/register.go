package routes

import (
	"encoding/json"
	"net/http"

	"github.com/valyala/fasthttp"
)

func Register(ctx *fasthttp.RequestCtx) {
	method := string(ctx.Method())
	switch string(ctx.Path()) {
	case "/comment":
		if method == "GET" {
			CommentGET(ctx)
		} else if method == "POST" {
			CommentPost(ctx)
		} else {
			PageNotFound(ctx)
		}
	case "/replay":
		if method == "POST" {
			ReplayPost(ctx)
		} else {
			PageNotFound(ctx)
		}
	default:
		PageNotFound(ctx)
	}
}

func PageNotFound(ctx *fasthttp.RequestCtx) {
	ctx.SetStatusCode(http.StatusNotFound)
	json.NewEncoder(ctx).Encode(ResponseType{
		Message: "Page not found",
	})
}
