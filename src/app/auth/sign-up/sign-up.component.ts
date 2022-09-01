import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { Message, SelectItemGroup } from "primeng/api";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import * as moment from "moment";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit, OnDestroy {
  public flagprofession = false;
  //public user: UserGeneral = new UserGeneral();

  public angForm: UntypedFormGroup;
  public show: boolean = false;
  public flagN: number = 20;
  private subscribes: Subscription[] = [];

  public validateRole: boolean = false;
  public validateEmail: boolean = false;

  public flagAlert: boolean = false;

  public registred: boolean = false;
  public patternV: string =
    "^([a-zA-Z0-9_' - '.]+)@([a-zA-Z0-9_' - '.]+).([a-zA-Z]{2,5})$";

  constructor(
    private fb: UntypedFormBuilder,
    // private searchService: SearchService,
    private messageService: MessageService
  ) {
    this.createForm();
  }
  ngOnDestroy(): void {
    this.subscribes.forEach((sub) => {
      sub.unsubscribe();
    });
  }
  ngOnInit(): void {
    //this.loadData();
    //this.getYearRange();
  }


  createForm() {
    this.angForm = this.fb.group({
      name: [
        null,
        [
          Validators.required,
          Validators.pattern("[a-zA-ZñÑáéíóúÁÉÍÓÚs ]+"),
          Validators.maxLength(20),
          Validators.minLength(3),
        ],
      ],
      lastname: [
        null,
        [
          Validators.required,
          Validators.pattern("[a-zA-ZñÑáéíóúÁÉÍÓÚs ]+"),
          Validators.maxLength(20),
          Validators.minLength(3),
        ],
      ],
      email: [null, [Validators.required, Validators.pattern(this.patternV)]],
      password: [null, [Validators.required]],
      terms: [false, [Validators.required]],
    });
  }

  // async loadData() {
  //   //extraemos datos de profesions
  //   let profesionSub = await this.searchService
  //     .getProfession()
  //     .subscribe((res) => {
  //       this.profesions = res.map((item) => {
  //         return { id: item.id, name: item.description };
  //       });
  //       //console.log(this.profesions);
  //       this.profesions = this.profesions;
  //     });

  //   //extraemos datos de nivel de educacion
  //   let levelSub = await this.searchService
  //     .getLevelEducation()
  //     .subscribe((res) => {
  //       this.levelsEdications = res.results.map((item: any) => {
  //         return { id: item.id, name: item.description };
  //       });
  //       this.levelsEdications = this.levelsEdications;
  //     });

  //   //Extraemos los datos de precerencias por area
  //   let preferencesSub = await this.searchService
  //     .getPreferencesArea()
  //     .subscribe((res) => {
  //       this.preferenceAreas = res.results.map((item: any) => {
  //         return {
  //           value: item.id,
  //           label: item.preferences_are,
  //           items: item.preferences.map((item: any) => {
  //             return { value: item.id, label: item.description };
  //           }),
  //         };
  //       });
  //       this.preferenceAreas = this.preferenceAreas;
  //     });

  //   let interestingsSub = await this.searchService
  //     .getInterestAreas()
  //     .subscribe((res) => {
  //       this.areasInterestings = res.map((item: any) => {
  //         return { id: item.id, name: item.name };
  //       });
  //       this.areasInterestings = this.areasInterestings;
  //     });

  //   this.subscribes.push(
  //     profesionSub,
  //     levelSub,
  //     preferencesSub,
  //     interestingsSub
  //   );
  // }

  validarCamp(event): boolean {
    if (this.angForm.get("name").hasError("pattern")) {
      return true;
    }
    return false;
  }
  getErrorNumber(field: string): number {
    if (this.angForm.get(field).hasError("pattern")) {
      return (this.flagN = 0);
    }
    return (this.flagN = 20);
  }
  getvals(field: any): boolean {
    return this.angForm.get(field).pristine;
  }

  get name() {
    return this.angForm.get("name");
  }
  get lastname() {
    return this.angForm.get("lastname");
  }
  get email() {
    return this.angForm.get("email");
  }
  get password() {
    return this.angForm.get("password");
  }
  get terms() {
    return this.angForm.get("terms");
  }
  markTouchForm() {
    (<any>Object).values(this.angForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  async removeEmail() {
    await this.angForm.removeControl("email");
  }

  addEmailPathTeacherAndExpert() {
    this.angForm.addControl(
      "email",
      new UntypedFormControl(null, [
        Validators.required,
        Validators.pattern(
          "^[A-Za-z\\d]+(@)+[u]+[p]+[s]+.+[e]+[d]+[u]+.+[e]+[c]"
        ),
        /*^[a-z]+(@)+[u]+[p]+[s]+.+[e]+[d]+[u]+.+[e]+[c]*/
      ])
    );
  }

  async validateUser() {
    //console.log("Form register", this.angForm);
    
      //console.log("Si paso1")
      this.markTouchForm();

      if (this.angForm.valid) {
        this.validateRole = false;
        Swal.fire({
          allowOutsideClick: false,
          icon: "info",
          text: "Registrando...",
        });
        Swal.showLoading();
        //console.log("Si paso")
        if (this.angForm.value.terms) {
          //this.getDataMaped();
          //console.log("user send", this.user);
          // let registerSub = await this.auth.registerUser(this.user).subscribe(
          //   (res) => {
          //     //console.log("Ad",res)
          //     this.registred = true;
          //     this.validateEmail = false;
          //     Swal.close();
          //   },
          //   (err) => {
          //     if (err.error.email[0] == "El correo debe ser institucionals") {
          //      this.showError('El correo electronico debe ser institucional');
          //     } else if (err.error.email[0] == "This field must be unique.") {
          //       this.showError('El correo que ingreso ya se encuentra registrado');
          //       this.flagAlert = true;
          //     }
          //     this.validateEmail = true;
          //     Swal.close();
          //   }
          // );
          //this.subscribes.push(registerSub);
        } else {
          this.markTouchForm();
        }
      } else {
        this.markTouchForm();
      }
    
  }

  showError(message) {
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: message,
    });
  }

  // getDataMaped() {
  //   this.user.roles = [];
  //   if (this.checkEs) {
  //     this.user.roles.push("student");
  //   }
  //   if (this.checkTe) {
  //     this.user.roles.push("teacher");
  //   }
  //   if (this.checkEx) {
  //     this.user.roles.push("expert");
  //   }
  //   this.user.first_name = this.angForm.value.name;
  //   this.user.last_name = this.angForm.value.lastname;
  //   this.user.email = this.angForm.value.email;
  //   this.user.password = this.angForm.value.password;

  //   if (this.checkEs) {
  //     this.user.education_levels = this.angForm.value.educacionL.map(
  //       (res) => res.id
  //     );
  //     this.user.knowledge_areas = this.angForm.value.areasInteres.map(
  //       (res) => res.id
  //     );
  //     this.user.preferences = this.angForm.value.areasPrefer;

  //     this.user.has_disability = this.angForm.value.typeDisability;

  //     this.user.birthday = moment(this.angForm.value.calendar).format(
  //       "YYYY-MM-DD"
  //     );
  //   }

  //   if (this.checkTe) {
  //     this.user.professions = this.angForm.value.profession.map(
  //       (res) => res.id
  //     );
  //   }
  //   if (this.checkEx) {

  //     this.user.expert_level = this.angForm.value.levelExpertF;

  //     if(this.angForm.value.url != null){
  //       this.user.web = this.angForm.value.url;

  //     }
  //     if(this.angForm.value.academic != null){
  //       this.user.academic_profile = this.angForm.value.academic;
  //     }
  //   }
  // }
  getYearRange() {
    let date = new Date();
    return `${`${date.getFullYear() - 60}:${date.getFullYear() - 6}`}`;
  }
  selectLevels(evt) {
    this.angForm.patchValue({
      educacionL: evt.value,
    });
  }
  selectAreas(evt) {
    this.angForm.patchValue({
      areasInteres: evt.value,
    });
  }
  selectProfesion(evt) {
    this.angForm.patchValue({
      profession: evt.value,
    });
  }
}
