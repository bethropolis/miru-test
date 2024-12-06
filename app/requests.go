package app

import (
	"bytes"
	"io"
	"log"
	"net/http"
	"time"
)

// HTTPResponse represents the structure we'll return to the frontend
type HTTPResponse struct {
    Status  int               `json:"status"`
    Body    string            `json:"body"`
    Headers map[string][]string `json:"headers"`
    Error   string            `json:"error,omitempty"`
}

// HTTPRequest represents the request structure coming from frontend
type HTTPRequest struct {
    URL     string            `json:"url"`
    Method  string            `json:"method"`
    Headers map[string]string `json:"headers"`
    Body    string            `json:"body"`
}

// MakeRequest takes an HTTPRequest and makes the HTTP request
func MakeRequest(req HTTPRequest) (HTTPResponse, error) {
   client := &http.Client{Timeout: 10 * time.Second} // Timeout of 10 seconds

    
    // Create a new HTTP request
    httpReq, err := http.NewRequest(req.Method, req.URL, bytes.NewBuffer([]byte(req.Body)))
    if err != nil {
        return HTTPResponse{Error: err.Error()}, err
    }

    // Add headers to the request
    for key, value := range req.Headers {
        httpReq.Header.Set(key, value)

        log.Println("Header added: ", key, value)
    }

    // Make the request
    resp, err := client.Do(httpReq)
    if err != nil {
        return HTTPResponse{Error: err.Error()}, err
    }
    defer resp.Body.Close()

    // Read the response body
	body, err := io.ReadAll(resp.Body)
    if err != nil {
        return HTTPResponse{Error: err.Error()}, err
    }

    // Prepare the response
    response := HTTPResponse{
        Status:  resp.StatusCode,
        Body:    string(body),
        Headers: resp.Header,
    }

	log.Printf("Request to %s returned status %d", req.URL, resp.StatusCode)

    return response, nil
}