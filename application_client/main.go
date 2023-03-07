package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/windows"

)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "application_client",
		Width:  600,
		Height: 400,
        MinWidth: 600,
        MinHeight:          400,
        MaxWidth:           600,
        MaxHeight:          400,
		DisableResize: true,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		Windows: &windows.Options{
            WebviewIsTransparent:              false,
            WindowIsTranslucent:               false,
            BackdropType:                      windows.Mica,
            DisableWindowIcon:                 false,
            DisableFramelessWindowDecorations: false,
            WebviewUserDataPath:               "",
            WebviewBrowserPath:                "",
            Theme:                             windows.SystemDefault,
            CustomTheme: &windows.ThemeSettings{
                DarkModeTitleBar:   windows.RGB(20, 20, 20),
                DarkModeTitleText:  windows.RGB(200, 200, 200),
                DarkModeBorder:     windows.RGB(20, 0, 20),
                LightModeTitleBar:  windows.RGB(200, 200, 200),
                LightModeTitleText: windows.RGB(20, 20, 20),
                LightModeBorder:    windows.RGB(200, 200, 200),
            },

		},
		BackgroundColour: &options.RGBA{R: 255, G: 255, B: 255, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
