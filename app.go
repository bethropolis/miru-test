package main

import (
    "context"
    "fmt"
    "miru-test/app" // Import the requests package
)

// App struct
type App struct {
    ctx context.Context
}


// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}


// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
    a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
    return fmt.Sprintf("Hello %s, It's show time!", name)
}

// MakeHTTPRequest is a Wails function that calls the MakeRequest method from requests.go
func (a *App) Request(req app.HTTPRequest) (app.HTTPResponse, error) {
    return app.MakeRequest(req)
}