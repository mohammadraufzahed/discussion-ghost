package utils

import (
	"github.com/mohammadraufzahed/discussion-ghost/models"
)

func FilterComment(comments []models.Comment) []models.Comment {
	var replays_id []uint
	for i := range comments {
		if len(comments[i].Replays) != 0 {
			for j := range comments[i].Replays {
				handle_replays(*comments[i].Replays[j], &replays_id)
			}
		}
	}
	var commentsNew []models.Comment
	for i := range comments {
		if !contains(replays_id, comments[i].ID) {
			commentsNew = append(commentsNew, comments[i])
		}
	}
	return commentsNew

}

func handle_replays(comment models.Comment, replays_id *[]uint) {
	*replays_id = append(*replays_id, comment.ID)
	if len(comment.Replays) != 0 {
		for i := range comment.Replays {
			handle_replays(*comment.Replays[i], replays_id)
		}
	}
}

func contains(s []uint, e uint) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}
