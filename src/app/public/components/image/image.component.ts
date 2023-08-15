import { AfterContentChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { Subscription } from "rxjs";
import { EventService } from "src/app/services/event.service";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ImageService } from "src/app/services/image.service";
import { LanguageService } from "src/app/services/language.service";

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.scss"],
  providers: [ConfirmationService, MessageService],
})
export class ImageComponent implements OnInit, OnDestroy, AfterContentChecked {
  @Input() item: any;
  private subscribes: Subscription[] = [];
  public angForm: UntypedFormGroup;
  public edit: boolean = false;
  private textAux: string;
  private textAux_Edit: string;
  public messages: any;
  public answers: any;

  public url: any;
  public displayModal: boolean;
  public flag_text_table: boolean = false;

  title = "Tets-table";
  config = {
    toolbar: ["insertTable"],
    language: "en",
  };

  public table_result: string = "";
  public Editor = ClassicEditor;
  public createMapImage: boolean = false;
  public figureMapImage: string;
  @ViewChild('myCanvas', { static: true }) canvas?: ElementRef;
  private canvasElemt?: any;
  private ctx: any;
  public cordenadasx: number[] = [];
  public cordenadasy: number[] = [];
  public etiquetas: string[] = [];

  public offsetX = 0;
  public offsetY = 0;

  private isDrawing = false;
  private startX = 0;
  private startY = 0;

  public width = 0;
  public height = 0;

  private endX = 0;
  private endY = 0;
  @ViewChild('dialog') dialog?: ElementRef;
  private cont = 0;
  public figureMapImageBoolean: boolean = false;
  public arrayTextArea: any[] = [];
  private arrayTextAreaValue: any[] = [];
  public editMapImageBoolean: boolean = false;
  private editMapAfterView: boolean = false;
  public figures = [
    { name: 'Circulo', code: 'Circulo' },
    { name: 'Rectangulo', code: 'Rectangulo' }
  ];
  constructor(
    private fb: UntypedFormBuilder,
    private messageService: MessageService,
    private eventService: EventService,
    private confirmationService: ConfirmationService,
    private imageService: ImageService,
    private languageService: LanguageService
  ) {
    this.createForm();
  }

  ngAfterContentChecked(): void {
    if (this.editMapAfterView == true) {
      let canvas = document.getElementById('containerCanvas');
      if (canvas != null) {
        this.cont = 0;
        this.addImageCanvas();
        this.editMapAfterView = false;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscribes.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    
    if(this.item.image_map != null && this.item.image_map !=""){
      this.editMapImageBoolean=true;
      this.arrayTextArea = JSON.parse(this.item.image_map_reference_data)
      let data_reference = JSON.parse(this.item.image_map_reference_coordinates);
      this.cordenadasx = data_reference.cordenadasx;
      this.cordenadasy = data_reference.cordenadasy;
      this.arrayTextAreaValue = data_reference.labels;
    }


    if (this.item.text_table) {
      this.table_result = this.item.text_table;
      this.flag_text_table = true;
    }
    this.angForm.addControl(
      this.item.id,
      new UntypedFormControl(this.item.text)
    );

    this.angForm.addControl(
      this.item.id,
      new UntypedFormControl(this.item.text)
    );
  }

  createForm() {
    this.angForm = this.fb.group({});
  }

  async onSave(item) {
    this.messages = [];

    let new_text_alt = this.angForm.get(item.toString()).value;
    this.answers = {
      text: new_text_alt,
      method: "img-alt",
    };
    let sendDescription = await this.imageService
      .updateImage(this.answers, item)
      .subscribe(
        async (response) => {
          if (response) {
            this.showSuccess(await this.languageService.get("edit.img.messages.success"));
            this.item.text = response.text;
            this.angForm.controls[item.toString()].setValue(new_text_alt);
            this.edit = false;
            this.eventService.emitEvent(true);
          }
        },
        (err) => {
          if (err.status == 304) {
            this.showError("Error, " + err.error?.message || err.message);
            this.edit = false;
            return;
          }

          this.showError("Error: " + err.error?.message || err.message);
          this.edit = false;
        }
      );

    this.subscribes.push(sendDescription);
  }

  public cliclEdit(texto) {
    this.edit = true;
    this.textAux = texto;
  }

  cancel(item) {
    this.edit = false;
    this.angForm.controls[item.toString()].setValue(this.textAux);
  }

  showError(message) {
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: message,
    });
  }

  showSuccess(message) {
    this.messageService.add({
      severity: "success",
      detail: message,
    });
  }

  cancelGenerate() {
    this.displayModal = false;
    this.table_result = this.textAux_Edit || "";
  }

  showModalDialog() {
    this.displayModal = true;
    this.flag_text_table = false;
  }

  async confirm(event: Event, id) {
    this.messageService.clear();
    this.confirmationService.confirm({
      target: event.target,
      message: await this.languageService.get("edit.img.table.p1"),//"Esta seguro que desea guardar los cambios ?",
      icon: "pi pi-exclamation-triangle",

      accept: async () => {
        if (this.flag_text_table == false && this.table_result != "") {
          this.answers = {
            text_table: this.table_result,
            method: "transform-table",
          };
          let sendDescription = await this.imageService
            .updateImage(this.answers, id)
            .subscribe(
              (response) => {
                if (response) {
                  this.item.text_table = response.text_table;
                  this.eventService.emitEvent(true);
                  this.messageService.add({
                    severity: "success",
                    summary: "Guardado",
                    detail: "La tabla se creo correctamente.",
                  });
                  this.displayModal = false;
                  this.flag_text_table = true;
                }
              },
              (err) => {
                this.showError("Error, " + err.error?.message || err.message);
              }
            );
        } else if (this.flag_text_table == true && this.table_result != "") {
          //editar tabla la segunda
          this.answers = {
            text_table: this.table_result,
            method: "update-table",
          };
          let sendDescription = await this.imageService
            .updateImage(this.answers, id)
            .subscribe(
              (response) => {
                if (response) {
                  this.eventService.emitEvent(true);
                  this.displayModal = false;
                  this.item.text_table = response.text_table;
                  this.messageService.clear;
                  this.messageService.add({
                    severity: "success",
                    summary: "Confirmed",
                    detail: "Se actualizo la tabla correctamente.",
                  });
                }
              },
              (err) => {
                this.showError("Error, " + err.error?.message || err.message);
              }
            );
          this.subscribes.push(sendDescription);
        } else if (this.table_result == "") {
          this.messageService.add({
            severity: "error",
            summary: "Tabla vacia",
            detail: "Porfavor genere una tabla antes de guardar",
          });
        }
      }
    });
  }

  showModalDialogEdit() {
    this.messageService.clear();
    this.displayModal = true;
    this.textAux_Edit = this.table_result;
    this.flag_text_table = true;
  }

  public async onChangeViewFullScreenImage(evt: any, item: any) {
    try {
      this.messageService.clear();
      let res = await this.imageService
        .updatePreviewImage({ preview: evt.checked }, item.id)
        .toPromise();
      this.eventService.emitEvent(true);
    } catch (error) {
      this.showError("Error, " + error.error?.message || error.message);
    }
  }

  public async onChangeRevert() {
    try {
      this.messageService.clear();
      let res = await this.imageService
        .revertImage(this.item.id, { adaptation: this.item.adaptation })
        .toPromise();
      this.eventService.emitEvent(true);
    } catch (error) {
      this.showError("Error, " + error.error?.message || error.message);
      this.item.adaptation = !this.item.adaptation;
    }
  }


  public addImageCanvas() {

    const img = new Image();
    this.canvasElemt = this.canvas?.nativeElement;
    this.ctx = this.canvas?.nativeElement?.getContext('2d');
    img.src = this.item.link
    img.onload = () => {
      const imageWidth = img.width;
      const imageHeight = img.height;

      this.canvasElemt.width = imageWidth;
      this.canvasElemt.height = imageHeight;

      this.ctx.drawImage(img, 0, 0, imageWidth, imageHeight);

      if (imageHeight > 480) {
        let pDialog = document.getElementById('containerCanvas');
        pDialog.style.height = 480 + 'px';
        this.canvasElemt.style.position = 'absolute';
      }
      if (imageWidth > 1200) {
        let pDialog = document.getElementById('containerCanvas');
        pDialog.style.width = 1000 + 'px';
        this.canvasElemt.style.position = 'absolute';
      }
    };

    if (this.editMapImageBoolean == true && this.editMapAfterView == true) {
      this.plotValuesOnCanvas();
    }

  }

  onMouseDown(event: MouseEvent) {

    if (this.figureMapImage == null) {
      this.messageService.add(
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Debe seleccionar una figura'
        }
      );
      this.figureMapImageBoolean = true; return
    } else { this.figureMapImageBoolean = false }

    this.getDialogDimensions();

    var rect = this.canvasElemt.getBoundingClientRect();
    var offsetX = event.clientX - rect.left;
    var offsetY = event.clientY - rect.top;

    var imageX = offsetX * (this.canvasElemt.width / rect.width);
    var imageY = offsetY * (this.canvasElemt.height / rect.height);

    this.offsetX = this.canvasElemt.offsetLeft;
    this.offsetY = this.canvasElemt.offsetTop;

    this.isDrawing = true;
    this.startX = imageX;
    this.startY = imageY;


    this.cordenadasx.push(Math.ceil(this.startX));
    this.cordenadasy.push(Math.ceil(this.startY));
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDrawing) {
      return;
    }
    this.getDialogDimensions();

    var rect = this.canvasElemt.getBoundingClientRect();
    var offsetX = event.clientX - rect.left;
    var offsetY = event.clientY - rect.top;

    this.endX = offsetX * (this.canvasElemt.width / rect.width);
    this.endY = offsetY * (this.canvasElemt.height / rect.height);

  }

  onMouseUp(event: MouseEvent) {
    if (this.figureMapImage == null) { this.figureMapImageBoolean = true; return } else { this.figureMapImageBoolean = false }

    if (this.figureMapImage == 'Rectangulo') {
      this.drawRectangle(this.startX, this.startY, this.endX, this.endY);
    } else if (this.figureMapImage == 'Circulo') {
      this.drawCircle(this.endX, this.endY, this.startX, this.startY);
    }

    this.cordenadasx.push(Math.ceil(this.endX));
    this.cordenadasy.push(Math.ceil(this.endY));
    this.generarTextArea(this.endX, this.endY, this.startX, this.startY, this.figureMapImage, 'new');
    this.isDrawing = false;
  }

  getDialogDimensions() {
    const dialogElement = this.dialog!.nativeElement;
    this.width = dialogElement.offsetWidth;
    this.height = dialogElement.offsetHeight;
  }

  generarTextArea(endX, endY, startX, startY, figureMapImage, type = "new", value = null) {
    this.cont++;
    const div = document.getElementById('containerCanvas');
    const texto = document.createElement('textarea');

    const width_height = (endX - startX) >= (endY - startY) ? (endX - startX) : (endY - startY);
    const radius = Math.hypot(endX - startX, endY - startY);
    const left = (figureMapImage == 'Rectangulo') ? startX + 'px' : ((startX) - (width_height)) + 'px';
    const top = (figureMapImage == 'Rectangulo') ? startY + 'px' : (startY - (radius)) + 'px';
    const width = (figureMapImage == 'Rectangulo') ? String(endX - startX) + 'px' : String((width_height * 2) + 3) + 'px';
    const height = (figureMapImage == 'Rectangulo') ? String(endY - startY) + 'px' : String((width_height * 2) + 3) + 'px';
    texto.id = this.cont + '';
    texto.style.position = 'absolute';
    texto.style.left = left;
    texto.style.top = top;
    texto.style.width = this.ctx.canvas.offsetWidth + '10';
    texto.style.height = this.ctx.canvas.offsetHeight + '10';
    texto.style.backgroundColor = 'rgba(150,150,150,0.5)';
    texto.style.color = 'black';
    texto.style.font = 'bold';
    texto.style.display = 'block';
    texto.style.width = width;
    texto.style.height = height;
    texto.value = value;
    if (figureMapImage == 'Circulo') {
      texto.style.padding = '17px';
      texto.style.borderRadius = '50%'
    }

    div?.appendChild(texto);
    if (type == 'new') {
      this.arrayTextArea.push({
        id: this.cont, data: {
          endX: endX, endY: endY, startX: startX, startY: startY, figureMapImage: figureMapImage
        }
      });
    }

  }

  drawRectangle(startX, startY, endX, endY) {
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.beginPath();
    this.ctx.rect(
      startX,
      startY,
      endX - startX,
      endY - startY
    );

    this.ctx.stroke();
    this.ctx.globalCompositeOperation = 'source-over';
  }

  drawCircle(endX, endY, startX, startY) {
    const radius = Math.hypot(endX - startX, endY - startY);
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.beginPath();
    this.ctx.arc(startX, startY, radius, 0, 2 * Math.PI);

    this.ctx.stroke();
    this.ctx.globalCompositeOperation = 'source-over';
  }

  public resetMessage() {
    this.messageService.clear();
    this.figureMapImageBoolean = false;
  }

  removeItemOld() {
    this.arrayTextAreaValue = [];
    const elementoARemover = document.getElementById("containerCanvas");
    let textArea = elementoARemover.getElementsByTagName('textarea');
    const elementoDeseado = document.getElementById(String(this.cont));
    for (let i = 0; i < textArea.length; i++) {
      this.arrayTextAreaValue.push({
        id: Number(textArea[i].id),
        value: textArea[i].value
      });

      const elemento = textArea[i];
      if (elemento === elementoDeseado) {
        // Realizar alguna acción con el elemento deseado
        elementoDeseado.remove();
        this.removeLines();
      }
    }
  }


  removeLines() {
    let arrayFilter = this.arrayTextArea.filter((res: any) => res.id === this.cont);
    if (arrayFilter.length == 0) {
      return;
    }

    this.arrayTextArea = this.arrayTextArea.filter((res: any) => res.id != this.cont);
    this.arrayTextAreaValue = this.arrayTextAreaValue.filter((res: any) => res.id != this.cont);
    this.cont = 0;

    this.plottingTextAreasAndTheirFigures();
    if (this.cordenadasx.length > 2) {
      this.cordenadasx = this.cordenadasx.splice(this.cordenadasx.length - 2, 2);
    } else {
      this.cordenadasx = [];
    }

    if (this.cordenadasy.length > 2) {
      this.cordenadasy = this.cordenadasy.splice(this.cordenadasy.length - 2, 2);
    } else {
      this.cordenadasy = [];
    }

  }

  private plottingTextAreasAndTheirFigures() {
    let containerCanvas: HTMLDivElement = document.getElementById('containerCanvas') as HTMLDivElement;
    var textareas = containerCanvas.querySelectorAll("textarea");

    textareas.forEach(function (textarea) {
      textarea.remove();
    });

    let canvas: HTMLCanvasElement = document.getElementById("camvas") as HTMLCanvasElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.addImageCanvas();
    this.plotValuesOnCanvas();
  }

  public plotValuesOnCanvas() {
    this.arrayTextArea.forEach((value: any) => {
      let text_value = this.arrayTextAreaValue.filter(value_arr => value_arr.id == value.id);
      this.generarTextArea(value.data.endX, value.data.endY, value.data.startX, value.data.startY, value.data.figureMapImage, "regenerate", text_value[0].value);
      if (value.data.figureMapImage == "Rectangulo") {
        this.drawRectangle(value.data.startX, value.data.startY, value.data.editorX, value.data.editorY);
      } else if (value.data.figureMapImage == "Circulo") {
        this.drawCircle(value.data.endX, value.data.endY, value.data.startX, value.data.startY);
      }
    });
  }

  guardar() {
    for (let i = 0; i < this.cont; i++) {
      const textarea: HTMLTextAreaElement = document.getElementById(String(i + 1)) as HTMLTextAreaElement;
      let text = textarea.value;
      this.etiquetas.push(text);
    }

    this.crearArea(
      this.cordenadasx,
      this.cordenadasy,
      this.arrayTextArea,
      this.etiquetas
    );
  }

  crearArea(
    cordenadasx: number[] = [],
    cordenadasy: number[] = [],
    arrayTextArea: any[] = [],
    etiquetas: string[] = [],
  ) {
    var xa = 0;
    var ya = 0;
    var cont2 = 0;

    let map;

    map = document.createElement('map');
    map.name = 'Map';
    map.id = 'Map';
    let cont_array = 0;

    for (var i = 1; i <= cordenadasx.length; i++) {
      if (i % 2 == 0) {

        const area = document.createElement('area');
        if (arrayTextArea[cont_array].data.figureMapImage == 'Rectangulo') {
          var cordenadas =
            xa +
            ',' +
            ya +
            ',' +
            cordenadasx[i - 1] +
            ',' +
            cordenadasy[i - 1] +
            '';
          area.id = 'are' + cont2;
          area.shape = 'rect';
          area.coords = cordenadas;
          area.href = '#';
          area.alt = etiquetas[cont2] || '';
          cont2++;
        } else if (arrayTextArea[cont_array].data.figureMapImage == 'Circulo') {
          let distancia;
          distancia = Math.sqrt(
            (cordenadasx[i - 1] - xa) * (cordenadasx[i - 1] - xa) +
            (cordenadasy[i - 1] - ya) * (cordenadasy[i - 1] - ya)
          );
          cordenadas = xa + ',' + ya + ',' + Math.ceil(distancia) + '';
          area.shape = 'circle';
          area.coords = cordenadas;
          area.href = "#";
          area.alt = etiquetas[cont2] || '';
          cont2++;
        }
        cont_array += 1;
        map.appendChild(area);
      } else {
        xa = cordenadasx[i - 1];
        ya = cordenadasy[i - 1];
      }
    }
    this.saveMapImage(map);
    // let contenedorIMage = document.getElementById("contenedorImage");
    // contenedorIMage?.appendChild(map);
  }

  private async saveMapImage(map: HTMLMapElement) {
    // let arrayTextAreaLabels = [];
    const elementoARemover = document.getElementById("containerCanvas");
    let textArea = elementoARemover.getElementsByTagName('textarea');
    for (let i = 0; i < textArea.length; i++) {
      this.arrayTextAreaValue.push({
        id: Number(textArea[i].id),
        value: textArea[i].value
      });
    }

    if (this.editMapImageBoolean == true) {
      try {
        let data = {
          text_table: String(map.outerHTML),
          method: "image-map-update",
          image_map_reference_data: JSON.stringify(this.arrayTextArea),
          image_map_reference_coordinates: JSON.stringify({
            cordenadasx: this.cordenadasx,
            cordenadasy: this.cordenadasy,
            labels: this.arrayTextAreaValue
          })
        }
        let saveMapImage = await this.imageService.updateImage(data, this.item.id).toPromise();
        this.editMapImageBoolean = true;
        this.showSuccess(await this.languageService.translate.get('adapter.areas.img.udpateSuccess').toPromise());
        this.createMapImage = false;
      } catch (err) {
        this.showError(await this.languageService.translate.get('adapter.areas.img.errorMapImage').toPromise());
        console.log(err);
      }
    } else {
      try {
        let data = {
          text_table: String(map.outerHTML),
          method: "image-map-create",
          image_map_reference_data: JSON.stringify(this.arrayTextArea),
          image_map_reference_coordinates: JSON.stringify({
            cordenadasx: this.cordenadasx,
            cordenadasy: this.cordenadasy,
            labels: this.arrayTextAreaValue
          })
        }
        let saveMapImage = await this.imageService.updateImage(data, this.item.id).toPromise();
        this.editMapImageBoolean = true;
        this.showSuccess(await this.languageService.translate.get('adapter.areas.img.saveMapSuccess').toPromise());
        this.createMapImage = false;
      } catch (err) {
        this.showError(await this.languageService.translate.get('adapter.areas.img.errorMapImage').toPromise());
        console.log(err);
      }
    }

  }

  public async editaCanvas() {
    this.createMapImage = true;
    this.editMapAfterView = true;
  }

}

