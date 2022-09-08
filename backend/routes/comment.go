package routes

import (
	"encoding/json"
	"net/http"

	"github.com/mohammadraufzahed/discussion-ghost/database"
	"github.com/mohammadraufzahed/discussion-ghost/models"
	"github.com/mohammadraufzahed/discussion-ghost/utils"
	"github.com/valyala/fasthttp"
)

type Hi struct {
	Message string `json:"message"`
}

type RequestCommentPost struct {
	Name    string `json:"name"`
	Profile string `json:"profile"`
	Content string `json:"content"`
}

type ResponseType struct {
	Message string `json:"message"`
}

func CommentGET(ctx *fasthttp.RequestCtx) {
	// Create a json encoder
	jsonEncoder := json.NewEncoder(ctx)
	var comments []models.Comment
	// Get comments with relations
	database.Db.Preload("Replays").Preload("Replays.Replays.Replays.Replays.Replays.Replays.Replays").Find(&comments)
	if len(comments) == 0 {
		jsonEncoder.Encode(ResponseType{
			Message: "Comments table are empty",
		})
	} else {
		commentsPure := utils.FilterComment(comments)
		jsonEncoder.Encode(commentsPure)
	}
}

func CommentPost(ctx *fasthttp.RequestCtx) {
	jsonEncoder := json.NewEncoder(ctx)
	body := ctx.Request.Body()
	var bodyJson RequestCommentPost
	err := json.Unmarshal(body, &bodyJson)
	if err != nil {
		ctx.SetStatusCode(http.StatusBadRequest)
		jsonEncoder.Encode(ResponseType{
			Message: "Faild to decode the payload",
		})
		return
	}
	if bodyJson.Content == "" || bodyJson.Name == "" || bodyJson.Profile == "" {
		ctx.SetStatusCode(http.StatusBadRequest)
		jsonEncoder.Encode(ResponseType{
			Message: "Faild to validate the payload",
		})
		return
	}
	database.Db.Create(&models.Comment{
		Name:    bodyJson.Name,
		Profile: bodyJson.Profile,
		Content: bodyJson.Content,
	})
	ctx.SetStatusCode(http.StatusOK)
	jsonEncoder.Encode(ResponseType{
		Message: "ok",
	})
}
