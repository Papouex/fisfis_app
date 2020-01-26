import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { View, EventData } from "tns-core-modules/ui/core/view";
import { TouchGestureEventData } from "tns-core-modules/ui/gestures";
import { RouterExtensions } from "nativescript-angular/router";
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from "@angular/forms";
import { Switch } from "tns-core-modules/ui/switch/switch";
import { UserService } from "../services/utilisateur/user.service";
import { PassesService } from "../services/passes/passes.service";
import { Router } from "@angular/router";
import { device } from "tns-core-modules/platform";
import { TranslateService } from "@ngx-translate/core";
@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css'],
    providers: [UserService,TranslateService]
})
export class LoginComponent implements OnInit, AfterViewInit {


    @ViewChild("item", { static: false }) angularItem: ElementRef;
    @ViewChild("btn", { static: false }) btnRef: ElementRef;
    @ViewChild("circle", { static: false }) circleRef: ElementRef;
    @ViewChild("logo", { static: false }) logoRef: ElementRef;
    item: View;
    btnItem: View;
    circleItem: View;
    logoItem: View;
    userForm: FormGroup;
    textFieldValue: string = "";
    isLogin = true;
    formSubmitted = false;
    navigating = false;
    loginTxt = "L o g i n";
    lng: string = "fr";
    lng_drapeau: boolean = true;
    user: any;
    email: string;
    password: string;
    error: Boolean = false;
    errorMsg: string = "";

    constructor(private _page: Page, private routerExtensions: RouterExtensions,
        private fb: FormBuilder, private userService: UserService, private passService: PassesService,
        private router: Router,private translate:TranslateService) {
            this.translate.use(device.language.split("-")[0]);
            //console.log(this.translate.use(device.language.split("-")[0]))
        this.userForm = this.fb.group({
            fname: new FormControl('', [
                Validators.required,
                Validators.pattern("[a-zA-Z ]*")
            ]),
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            phone_number: new FormControl('', [
                Validators.required,
                Validators.pattern("[0-9]{8}"),
                Validators.min(10000000),
                Validators.max(99999999)
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(6)
            ]),
            cpassword: new FormControl('', [
                Validators.required,
                this.passValidation,
            ]),
            pass: new FormControl('', [
                Validators.required
            ])
        });
        this.userForm.controls.password.valueChanges.subscribe(
            x => this.userForm.controls.cpassword.updateValueAndValidity()
        )
    }

    ngOnInit(): void {

        console.log("hellodjbkhbj")
    }
    ngAfterViewInit() {
        this._page.on('navigatingTo', (data) => {
            this.circleItem.scaleX = 0;
            this.circleItem.scaleY = 0;
            this.navigating = false;
            this.logoItem.translateY = 0;
        })
        this._page.actionBarHidden = true;
        this.btnItem = this.btnRef.nativeElement;
        this.item = this.angularItem.nativeElement;
        this.circleItem = this.circleRef.nativeElement;
        this.logoItem = this.logoRef.nativeElement;

        this.item.scaleX = 0;
        this.item.scaleY = 0;
        this.circleItem.scaleX = 0;
        this.circleItem.scaleY = 0;
        this.btnItem.translateY = 0;
    }

    onCheckedChange(args: EventData) {
        let sw = args.object as Switch;
        let isChecked = sw.checked;
        this.lng_drapeau = isChecked;
        if (isChecked) {
            this.lng = "en";
           this.translate.use(this.lng);

        } else {
            this.lng = "fr";
            this.translate.use(this.lng);
        }

    }
    onButtonTap(): void {

        this.formSubmitted = true;
        if (this.isLogin) {
            const user = {
                email: this.email,
                password: this.password
            }
            if (!this.email || !this.password) {
                this.error = true;
                this.errorMsg = 'Les champs email et mot de passe sont obligatoires';
                this.formSubmitted = false;
            } else {
                console.log("before authenticate useqsdsr")
                this.userService.authenticateUser(user).subscribe((res: any) => {
                    if (res.success) {
                        console.log(res)
                        this.userService.storeUserData(res.token, res.user);
                        this.routerExtensions.navigate(["/home/main"]);
                                    this.formSubmitted = false;

                        setTimeout(() => {
                            this.navigating = true;
                            this.logoItem.animate({
                                translate: { x: 0, y: 200 },
                                duration: 400
                            }).then(() => {
                                this.circleItem.translateY = 200;
                                this.circleItem.animate({
                                    scale: { x: 15, y: 15 },
                                    duration: 400,
                                }).then(() => {
                                    
                                });
                            });

                        }, 1500);
                    } else {
                        console.log(res)
                        this.error = true;
                        this.errorMsg = res.msg;
                    }
                })
            }
        } else {
            if (this.userForm.valid) {
                this.user = this.userForm.value;
                this.user.prefered_lng = this.lng;
                this.user.zone = "La Marsa";
                this.userService.ajouterUtilisateur(this.user).subscribe((res: any) => {
                    if (res.success) {
                        let x = res.obj;
                        this.passService.submitUser(x.pass._id, { userId: x.userId }).subscribe((res: any) => {
                            if (res.success) {
                                this.userService.authenticateUser(this.user).subscribe((res: any) => {
                                    if (res.success) {
                                        this.userService.storeUserData(res.token, res.user);
                                        setTimeout(() => {
                                            this.navigating = true;
                                            this.logoItem.animate({
                                                translate: { x: 0, y: 200 },
                                                duration: 400
                                            }).then(() => {
                                                this.circleItem.translateY = 200;
                                                this.circleItem.animate({
                                                    scale: { x: 15, y: 15 },
                                                    duration: 400,
                                                }).then(() => {
                                                    this.routerExtensions.navigate(["/home/main"]);
                                                    this.formSubmitted = false;
                                                });
                                            });

                                        }, 1500);
                                    }
                                })
                            } else {
                                this.error = true;
                                this.errorMsg = res.msg;
                                this.formSubmitted = false;
                            }
                        })
                    } else {
                        this.error = true;
                        this.errorMsg = res.msg;
                        this.formSubmitted = false;
                    }
                })
            } else if (this.userForm.invalid) {
                this.error = true;
                this.errorMsg = "Formulaire invalid";
                this.formSubmitted = false;
                return;
            }
        }


    }

    onFocus(args: TouchGestureEventData) {

        if (args.action == "down") {
            this.btnItem.scaleX = 0.9;
            this.btnItem.scaleY = 0.9;
        } else if (args.action == "up") {
            this.btnItem.scaleX = 1;
            this.btnItem.scaleY = 1;
        }

    }

    setToLogin() {
        this.item.animate({
            scale: { x: 0, y: 0 },
            duration: 300
        }).then(() => {
            this.isLogin = true;
            this.loginTxt = "L o g i n";
            this.btnItem.animate({
                translate: { x: 0, y: -50 },
                duration: 200
            })
        });
    }

    setToRegister() {

        this.isLogin = false;
        this.loginTxt = "R e g i s t e r";

        this.btnItem.animate({
            translate: { x: 0, y: 0 },
            duration: 200
        }).then(() => {
            this.item.animate({
                scale: { x: 1.6, y: 1.6 },
                duration: 300
            }).then(() => {
                this.item.animate({ scale: { x: 1, y: 1 }, duration: 200 })
            });
        });




    }




    passValidation(control: AbstractControl) {
        if (control && (control.value !== null || control.value !== undefined)) {
            const cpass = control.value;
            const pass = control.root.get('password');
            if (pass) {
                const passVal = pass.value;
                if (passVal != cpass) {
                    return {
                        isError: true
                    }
                }
            }

        }
        return null;
    }

}
