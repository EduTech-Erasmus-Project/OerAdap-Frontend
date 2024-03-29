import { NgModule } from "@angular/core";
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";

// PrimeNG Components for demos
import { AccordionModule } from "primeng/accordion";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChartModule } from "primeng/chart";
import { CheckboxModule } from "primeng/checkbox";
import { CodeHighlighterModule } from "primeng/codehighlighter";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ColorPickerModule } from "primeng/colorpicker";
import { ContextMenuModule } from "primeng/contextmenu";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import { FieldsetModule } from "primeng/fieldset";
import { FileUploadModule } from "primeng/fileupload";
import { FullCalendarModule } from "primeng/fullcalendar";
import { InputTextareaModule } from "primeng/inputtextarea";
import { PaginatorModule } from "primeng/paginator";
import { TabMenuModule } from "primeng/tabmenu";
import { TableModule } from "primeng/table";
import { VirtualScrollerModule } from "primeng/virtualscroller";

// Application Components //** */
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

// Application services
import { BreadcrumbService } from "./services/breadcrumb.service";
import { HttpLoaderFactory, SharedModule } from "./shared/shared.module";
import { PublicModule } from "./public/public.module";
import { QuicklinkModule } from "ngx-quicklink";
import { MessageService, ConfirmationService } from "primeng/api";
import { CookieService } from "ngx-cookie-service";
import { UntypedFormBuilder } from "@angular/forms";
import { MenuService } from "./services/app.menu.service";
import { TokenRefInterceptor } from "./interceptors/token-ref.interceptor";
import { NumeralModule } from "ngx-numeral";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AccordionModule,
    AutoCompleteModule,
    CalendarModule,
    ChartModule,
    CheckboxModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ColorPickerModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    FullCalendarModule,
    InputTextareaModule,
    PaginatorModule,
    TableModule,
    TabMenuModule,
    VirtualScrollerModule,
    SharedModule,
    PublicModule,
    QuicklinkModule,
    //SocketIoModule.forRoot(config),
    NumeralModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  declarations: [AppComponent],
  //PathLocationStrategy
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    MenuService,
    BreadcrumbService,
    MessageService,
    CookieService,
    UntypedFormBuilder,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenRefInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
