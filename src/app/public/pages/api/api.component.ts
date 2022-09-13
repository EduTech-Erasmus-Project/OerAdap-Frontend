import { Component, OnDestroy, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ContactService } from "../../../services/contact.service";
import { MessageService } from "primeng/api";
import { Subscription } from "rxjs";

@Component({
  selector: "app-api",
  templateUrl: "./api.component.html",
  styleUrls: ["./api.component.scss"],
})
export class ApiComponent implements OnInit, OnDestroy {
  public formApi: UntypedFormGroup;
  public loader: boolean = false;
  private subscriptions: Subscription[] = [];

  data = {
    id: 105,
    oa_detail: {
      title: "Sistemas numericos ",
    },
    created_at: "2021-12-26T16:22:37.553032Z",
    expires_at: "2021-12-27T16:22:37.553032Z",
    preview_origin:
      "https://oeradap.edutech-project.org/uploads/OASCORM_eVJB6yyN/OASCORM_eVJB6yyN_origin/index.html",
    preview_adapted:
      "https://oeradap.edutech-project.org/uploads/OASCORM_eVJB6yyN/OASCORM_eVJB6yyN_adapted/index.html",
    file_detail: {
      pages: 39,
      images: 21,
      paragraphs: 21,
      videos: 6,
      audios: 0,
    },
    adapted_detail: {
      images: 21,
      paragraphs: 21,
      videos: 0,
      audios: 0,
    },
    config_adaptability: {
      id: 102,
      method: "automatic",
      areas: ["image", "audio", "video", "paragraph", "button"],
    },

    complete_adaptation: true,
    button_adaptation: true,
    audio_adaptation: true,
    image_adaptation: true,
    paragraph_adaptation: true,
    video_adaptation: true,
    "metadata": [
      {
          "area": "image",
          "metadata": [
              {
                  "property": "accessibilityFeature",
                  "type": "alternativeText"
              }
          ]
      },
      {
          "area": "audio",
          "metadata": [
              {
                  "property": "accessibilityFeature",
                  "type": "transcript"
              },
              {
                  "property": "accessibilityFeature",
                  "type": "ttsMarkup"
              },
              {
                  "property": "accessMode",
                  "type": "textual"
              }
          ]
      },
      {
          "area": "video",
          "metadata": [
              {
                  "property": "accessibilityFeature",
                  "type": "caption"
              },
              {
                  "property": "accessibilityFeature",
                  "type": "synchronizedAudioText"
              }
          ]
      },
      {
          "area": "paragraph",
          "metadata": [
              {
                  "property": "alignmentType",
                  "type": "textComplexity"
              },
              {
                  "property": "alignmentType",
                  "type": "readingLevel"
              },
              {
                  "property": "accessMode",
                  "type": "auditory"
              }
          ]
      },
      {
          "area": "button",
          "metadata": [
              {
                  "property": "accessibilityFeature",
                  "type": "displayTransformability/background-color"
              },
              {
                  "property": "accessibilityFeature",
                  "type": "displayTransformability/font-family"
              },
              {
                  "property": "accessibilityFeature",
                  "type": "displayTransformability/font-size"
              },
              {
                  "property": "accessibilityFeature",
                  "type": "displayTransformability/color"
              },
              {
                  "property": "accessibilityFeature",
                  "type": "displayTransformability/word-spacing"
              },
              {
                  "property": "accessibilityFeature",
                  "type": "displayTransformability/line-height"
              },
              {
                  "property": "accessibilityFeature",
                  "type": "captions"
              },
              {
                  "property": "accessibilityFeature",
                  "type": "synchronizedAudioText"
              },
              {
                  "property": "accessibilityFeature",
                  "type": "highContrastDisplay"
              },
              {
                  "property": "accessibilityFeature",
                  "type": "transcript"
              },
              {
                  "property": "accessibilityFeature",
                  "type": "structuralNavigation"
              },
              {
                  "property": "accessibilityFeature",
                  "type": "readingOrder"
              },
              {
                  "property": "accessibilityFeature",
                  "type": "tableOfContents"
              },
              {
                  "property": "accessibilityFeature",
                  "type": "index"
              }
          ]
      }
  ],
    file_download:
      "https://oeradap.edutech-project.org/uploads/OASCORM_eVJB6yyN/OASCORM_eVJB6yyN_adapted.zip",
  };

  arrayData = [
    {
      id: 105,
      oa_detail: {
        title: "Sistemas numericos ",
      },
      created_at: "2021-12-26T15:11:55.029890Z",
      expires_at: "2021-12-27T15:11:55.029890Z",
      preview_origin:
        "https://oeradap.edutech-project.org/uploads/OASCORM_fg3LF8Z5/OASCORM_fg3LF8Z5_origin/index.html",
      preview_adapted:
        "https://oeradap.edutech-project.org/uploads/OASCORM_fg3LF8Z5/OASCORM_fg3LF8Z5_adapted/index.html",
      file_detail: {
        pages: 39,
        images: 21,
        paragraphs: 21,
        videos: 6,
        audios: 0,
      },
      adapted_detail: {
        images: 21,
        paragraphs: 21,
        videos: 0,
        audios: 0,
      },
      config_adaptability: {
        id: 101,
        method: "automatic",
        areas: ["image", "audio", "video", "paragraph", "button"],
      },

      complete_adaptation: true,
      button_adaptation: true,
      audio_adaptation: true,
      image_adaptation: true,
      paragraph_adaptation: true,
      video_adaptation: true,
      "metadata": [
        {
            "area": "image",
            "metadata": [
                {
                    "property": "accessibilityFeature",
                    "type": "alternativeText"
                }
            ]
        },
        {
            "area": "audio",
            "metadata": [
                {
                    "property": "accessibilityFeature",
                    "type": "transcript"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "ttsMarkup"
                },
                {
                    "property": "accessMode",
                    "type": "textual"
                }
            ]
        },
        {
            "area": "video",
            "metadata": [
                {
                    "property": "accessibilityFeature",
                    "type": "caption"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "synchronizedAudioText"
                }
            ]
        },
        {
            "area": "paragraph",
            "metadata": [
                {
                    "property": "alignmentType",
                    "type": "textComplexity"
                },
                {
                    "property": "alignmentType",
                    "type": "readingLevel"
                },
                {
                    "property": "accessMode",
                    "type": "auditory"
                }
            ]
        },
        {
            "area": "button",
            "metadata": [
                {
                    "property": "accessibilityFeature",
                    "type": "displayTransformability/background-color"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "displayTransformability/font-family"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "displayTransformability/font-size"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "displayTransformability/color"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "displayTransformability/word-spacing"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "displayTransformability/line-height"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "captions"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "synchronizedAudioText"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "highContrastDisplay"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "transcript"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "structuralNavigation"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "readingOrder"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "tableOfContents"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "index"
                }
            ]
        }
    ],
      file_download:
        "https://oeradap.edutech-project.org/uploads/OASCORM_fg3LF8Z5/OASCORM_fg3LF8Z5_adapted.zip",
    },
    {
      id: 106,
      oa_detail: {
        title: "Sistemas numericos ",
      },
      created_at: "2021-12-26T16:22:37.553032Z",
      expires_at: "2021-12-27T16:22:37.553032Z",
      preview_origin:
        "https://oeradap.edutech-project.org/uploads/OASCORM_eVJB6yyN/OASCORM_eVJB6yyN_origin/index.html",
      preview_adapted:
        "https://oeradap.edutech-project.org/uploads/OASCORM_eVJB6yyN/OASCORM_eVJB6yyN_adapted/index.html",
      file_detail: {
        pages: 39,
        images: 21,
        paragraphs: 21,
        videos: 6,
        audios: 0,
      },
      adapted_detail: {
        images: 21,
        paragraphs: 21,
        videos: 0,
        audios: 0,
      },
      config_adaptability: {
        id: 102,
        method: "automatic",
        areas: ["image", "audio", "video", "paragraph", "button"],
      },

      complete_adaptation: true,
      button_adaptation: true,
      audio_adaptation: true,
      image_adaptation: true,
      paragraph_adaptation: true,
      video_adaptation: true,
      "metadata": [
        {
            "area": "image",
            "metadata": [
                {
                    "property": "accessibilityFeature",
                    "type": "alternativeText"
                }
            ]
        },
        {
            "area": "audio",
            "metadata": [
                {
                    "property": "accessibilityFeature",
                    "type": "transcript"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "ttsMarkup"
                },
                {
                    "property": "accessMode",
                    "type": "textual"
                }
            ]
        },
        {
            "area": "video",
            "metadata": [
                {
                    "property": "accessibilityFeature",
                    "type": "caption"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "synchronizedAudioText"
                }
            ]
        },
        {
            "area": "paragraph",
            "metadata": [
                {
                    "property": "alignmentType",
                    "type": "textComplexity"
                },
                {
                    "property": "alignmentType",
                    "type": "readingLevel"
                },
                {
                    "property": "accessMode",
                    "type": "auditory"
                }
            ]
        },
        {
            "area": "button",
            "metadata": [
                {
                    "property": "accessibilityFeature",
                    "type": "displayTransformability/background-color"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "displayTransformability/font-family"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "displayTransformability/font-size"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "displayTransformability/color"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "displayTransformability/word-spacing"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "displayTransformability/line-height"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "captions"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "synchronizedAudioText"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "highContrastDisplay"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "transcript"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "structuralNavigation"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "readingOrder"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "tableOfContents"
                },
                {
                    "property": "accessibilityFeature",
                    "type": "index"
                }
            ]
        }
    ],
      file_download:
        "https://oeradap.edutech-project.org/uploads/OASCORM_eVJB6yyN/OASCORM_eVJB6yyN_adapted.zip",
    },
  ];

  constructor(
    private fb: UntypedFormBuilder,
    private messageService: MessageService,
    private contactService: ContactService
  ) {
    this.createForm();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {}
  createForm() {
    this.formApi = this.fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            "^([a-zA-Z0-9_'-'.]+)@([a-zA-Z0-9_'-'.]+).([a-zA-Z]{2,5})$"
          ),
        ],
      ],
      institution: [null, Validators.required],
      purpose_use: [null, Validators.required],
    });
  }
  markTouchForm() {
    (<any>Object).values(this.formApi.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  get email() {
    return this.formApi.get("email");
  }
  get institution() {
    return this.formApi.get("institution");
  }
  get purpose_use() {
    return this.formApi.get("purpose_use");
  }

  async validateForm() {
    if (this.formApi.valid) {
      this.loader = true;
      let sendEmailSub = await this.contactService
        .sendEmailRequestApi(this.formApi.value)
        .subscribe(
          (res: any) => {
            //console.log(res);
            if (res.Messages[0].Status === "success") {
              this.showSuccess();
              this.formApi.reset();
              this.loader = false;
            } else {
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail:
                  "Se ha producido un error inesperado intente enviar de nuevo.",
              });
              this.loader = false;
            }
          },
          (err) => {
            //console.log(err);
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail:
                "Se ha producido un error inesperado intente enviar de nuevo.",
            });
            this.loader = false;
          }
        );
      this.subscriptions.push(sendEmailSub);
    } else {
      this.markTouchForm();
    }
  }

  showSuccess() {
    this.messageService.add({
      severity: "success",
      summary: "Gracias",
      detail:
        "Su mensaje se ha enviado correctamente, por favor revisa tu bandeja de entrada del correo.",
    });
  }
}
