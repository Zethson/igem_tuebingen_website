jssor_1_slider_init = function () {

                var jssor_1_SlideshowTransitions = [
                    {
                        $Duration: 1200,
                        $Zoom: 1,
                        $Easing: {$Zoom: $Jease$.$InCubic, $Opacity: $Jease$.$OutQuad},
                        $Opacity: 2
                    },
                    {
                        $Duration: 1000,
                        $Zoom: 11,
                        $SlideOut: true,
                        $Easing: {$Zoom: $Jease$.$InExpo, $Opacity: $Jease$.$Linear},
                        $Opacity: 2
                    },
                    {
                        $Duration: 1200,
                        $Zoom: 1,
                        $Rotate: 1,
                        $During: {$Zoom: [0.2, 0.8], $Rotate: [0.2, 0.8]},
                        $Easing: {$Zoom: $Jease$.$Swing, $Opacity: $Jease$.$Linear, $Rotate: $Jease$.$Swing},
                        $Opacity: 2,
                        $Round: {$Rotate: 0.5}
                    },
                    {
                        $Duration: 1000,
                        $Zoom: 11,
                        $Rotate: 1,
                        $SlideOut: true,
                        $Easing: {$Zoom: $Jease$.$InQuint, $Opacity: $Jease$.$Linear, $Rotate: $Jease$.$InQuint},
                        $Opacity: 2,
                        $Round: {$Rotate: 0.8}
                    },
                    {
                        $Duration: 1200,
                        x: 0.5,
                        $Cols: 2,
                        $Zoom: 1,
                        $Assembly: 2049,
                        $ChessMode: {$Column: 15},
                        $Easing: {$Left: $Jease$.$InCubic, $Zoom: $Jease$.$InCubic, $Opacity: $Jease$.$Linear},
                        $Opacity: 2
                    },
                    {
                        $Duration: 1200,
                        x: 4,
                        $Cols: 2,
                        $Zoom: 11,
                        $SlideOut: true,
                        $Assembly: 2049,
                        $ChessMode: {$Column: 15},
                        $Easing: {$Left: $Jease$.$InExpo, $Zoom: $Jease$.$InExpo, $Opacity: $Jease$.$Linear},
                        $Opacity: 2
                    },
                    {
                        $Duration: 1200,
                        x: 0.6,
                        $Zoom: 1,
                        $Rotate: 1,
                        $During: {$Left: [0.2, 0.8], $Zoom: [0.2, 0.8], $Rotate: [0.2, 0.8]},
                        $Opacity: 2,
                        $Round: {$Rotate: 0.5}
                    },
                    {
                        $Duration: 1000,
                        x: -4,
                        $Zoom: 11,
                        $Rotate: 1,
                        $SlideOut: true,
                        $Easing: {
                            $Left: $Jease$.$InQuint,
                            $Zoom: $Jease$.$InQuart,
                            $Opacity: $Jease$.$Linear,
                            $Rotate: $Jease$.$InQuint
                        },
                        $Opacity: 2,
                        $Round: {$Rotate: 0.8}
                    },
                    {
                        $Duration: 1200,
                        x: -0.6,
                        $Zoom: 1,
                        $Rotate: 1,
                        $During: {$Left: [0.2, 0.8], $Zoom: [0.2, 0.8], $Rotate: [0.2, 0.8]},
                        $Opacity: 2,
                        $Round: {$Rotate: 0.5}
                    },
                    {
                        $Duration: 1000,
                        x: 4,
                        $Zoom: 11,
                        $Rotate: 1,
                        $SlideOut: true,
                        $Easing: {
                            $Left: $Jease$.$InQuint,
                            $Zoom: $Jease$.$InQuart,
                            $Opacity: $Jease$.$Linear,
                            $Rotate: $Jease$.$InQuint
                        },
                        $Opacity: 2,
                        $Round: {$Rotate: 0.8}
                    },
                    {
                        $Duration: 1200,
                        x: 0.5,
                        y: 0.3,
                        $Cols: 2,
                        $Zoom: 1,
                        $Rotate: 1,
                        $Assembly: 2049,
                        $ChessMode: {$Column: 15},
                        $Easing: {
                            $Left: $Jease$.$InCubic,
                            $Top: $Jease$.$InCubic,
                            $Zoom: $Jease$.$InCubic,
                            $Opacity: $Jease$.$OutQuad,
                            $Rotate: $Jease$.$InCubic
                        },
                        $Opacity: 2,
                        $Round: {$Rotate: 0.7}
                    },
                    {
                        $Duration: 1000,
                        x: 0.5,
                        y: 0.3,
                        $Cols: 2,
                        $Zoom: 1,
                        $Rotate: 1,
                        $SlideOut: true,
                        $Assembly: 2049,
                        $ChessMode: {$Column: 15},
                        $Easing: {
                            $Left: $Jease$.$InExpo,
                            $Top: $Jease$.$InExpo,
                            $Zoom: $Jease$.$InExpo,
                            $Opacity: $Jease$.$Linear,
                            $Rotate: $Jease$.$InExpo
                        },
                        $Opacity: 2,
                        $Round: {$Rotate: 0.7}
                    },
                    {
                        $Duration: 1200,
                        x: -4,
                        y: 2,
                        $Rows: 2,
                        $Zoom: 11,
                        $Rotate: 1,
                        $Assembly: 2049,
                        $ChessMode: {$Row: 28},
                        $Easing: {
                            $Left: $Jease$.$InCubic,
                            $Top: $Jease$.$InCubic,
                            $Zoom: $Jease$.$InCubic,
                            $Opacity: $Jease$.$OutQuad,
                            $Rotate: $Jease$.$InCubic
                        },
                        $Opacity: 2,
                        $Round: {$Rotate: 0.7}
                    },
                    {
                        $Duration: 1200,
                        x: 1,
                        y: 2,
                        $Cols: 2,
                        $Zoom: 11,
                        $Rotate: 1,
                        $Assembly: 2049,
                        $ChessMode: {$Column: 19},
                        $Easing: {
                            $Left: $Jease$.$InCubic,
                            $Top: $Jease$.$InCubic,
                            $Zoom: $Jease$.$InCubic,
                            $Opacity: $Jease$.$OutQuad,
                            $Rotate: $Jease$.$InCubic
                        },
                        $Opacity: 2,
                        $Round: {$Rotate: 0.8}
                    }
                ];

                var jssor_1_options = {
                    $AutoPlay: 1,
                    $SlideshowOptions: {
                        $Class: $JssorSlideshowRunner$,
                        $Transitions: jssor_1_SlideshowTransitions,
                        $TransitionsOrder: 1
                    },
                    $ArrowNavigatorOptions: {
                        $Class: $JssorArrowNavigator$
                    },
                    $ThumbnailNavigatorOptions: {
                        $Class: $JssorThumbnailNavigator$,
                        $Rows: 2,
                        $SpacingX: 14,
                        $SpacingY: 12,
                        $Orientation: 2,
                        $Align: 156
                    }
                };

                var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

                /*#region responsive code begin*/

                var MAX_WIDTH = 1500;

                function ScaleSlider() {
                    var containerElement = jssor_1_slider.$Elmt.parentNode;
                    var containerWidth = containerElement.clientWidth;

                    if (containerWidth) {

                        var expectedWidth = Math.min(MAX_WIDTH || containerWidth, containerWidth);

                        jssor_1_slider.$ScaleWidth(expectedWidth);
                    } else {
                        window.setTimeout(ScaleSlider, 30);
                    }
                }

                ScaleSlider();

                $Jssor$.$AddEvent(window, "load", ScaleSlider);
                $Jssor$.$AddEvent(window, "resize", ScaleSlider);
                $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
                /*#endregion responsive code end*/
            };