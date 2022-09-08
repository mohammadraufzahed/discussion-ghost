package main

import (
	"github.com/mohammadraufzahed/discussion-ghost/database"
	"github.com/mohammadraufzahed/discussion-ghost/routes"
	"github.com/valyala/fasthttp"
)

func main() {
	db, err := database.CreateDatabase()
	if err != nil {
		panic("Faild to connect to database")
	}
	database.InitializeModels(db)
	fasthttp.ListenAndServe(":8000", routes.Register)
}
