package routes

import (
	"encoding/json"
	"net/http"

	"github.com/mohammadraufzahed/discussion-ghost/database"
	"github.com/mohammadraufzahed/discussion-ghost/models"
	"github.com/valyala/fasthttp"
)

type ReplayT struct {
	RequestCommentPost
	Replay int32 `json:"replay"`
}

func ReplayPost(ctx *fasthttp.RequestCtx) {
	jsonEncoder := json.NewEncoder(ctx)
	body := ctx.Request.Body()
	var bodyJson ReplayT
	err := json.Unmarshal(body, &bodyJson)
	if err != nil {
		ctx.SetStatusCode(http.StatusInternalServerError)
		jsonEncoder.Encode(ResponseType{
			Message: "Faild to parse the body",
		})
	}
	var comment models.Comment
	database.Db.Where("id = ?", bodyJson.Replay).First(&comment)
	err = database.Db.Model(&comment).Association("Replays").Append(&models.Comment{
		Name:    bodyJson.Name,
		Content: bodyJson.Content,
		Profile: bodyJson.Profile,
	})
	if err != nil {
		panic(err)
	}
	jsonEncoder.Encode(comment)

}
