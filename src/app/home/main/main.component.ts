import { Component, OnInit, ViewContainerRef, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { View, EventData } from "tns-core-modules/ui/core/view";
import { screen, device } from "tns-core-modules/platform";
import { UserService } from "~/app/services/utilisateur/user.service";
import { CategorieService } from "~/app/services/categorie/categorie.service";
import { ProductsService } from "~/app/services/products/products.service";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { AdsService } from "~/app/services/ads/ads.service";
import { Switch } from "tns-core-modules/ui/switch/switch";
import { PrecommandService } from "~/app/services/precommand/precommand.service";
import { FormatPipe } from "~/app/services/pipe/format.pipe";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as Geolocation from "nativescript-geolocation";
import { HttpClient } from "@angular/common/http";
import { TimePicker } from "tns-core-modules/ui/time-picker/time-picker";
import { DatePipe } from "@angular/common";
import { CommandService } from "~/app/services/command/command.service";
import { PassesService } from "~/app/services/passes/passes.service";
import * as Toast from "nativescript-toast";
import { GeneralService } from "~/app/services/general/general.service";
import { ListPicker } from "tns-core-modules/ui/list-picker/list-picker";
var clipboard = require("nativescript-clipboard");
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { TranslateService } from "@ngx-translate/core";
export interface ItemCommande {
    product: string;
    prod_name: string;
    prod_qte: number;
    prod_stock: number;
    prod_seuil: number;
    prod_unit_price: number;
    prod_image: string;
}
@Component({
    selector: "ng-main-home",
    templateUrl: "./main.component.html",
    styleUrls: ['./main.component.css'],
    providers: [UserService, CategorieService,
        ProductsService, AdsService, PrecommandService,
        FormatPipe, DatePipe,
        CommandService, PassesService,GeneralService,TranslateService]
})
export class MainComponent implements OnInit, AfterViewInit,OnDestroy {
    
    photoWidth: number = screen.mainScreen.widthDIPs * 0.33333;
    photoHeight: number = this.photoWidth;
    selectedRoute: string = 'search';
    command: any;
    hours: Array<String> = ["15min", "30min", "1 Heure", "2 Heures", "3 Heures"]
    baseUrl = "http://stark-sands-45193.herokuapp.com"
    categories: any[] = [];
     //TEST DATA FOR NOTIFICATION
    notif: any = {
        notifications: [
            {
                notify_time: "Yesterday",
                notify_list: [
                    {
                        imageSrc: "~/assets/milk.png",
                        desc: {
                            name: "20% Reduction on Milk !",
                            date: "On 26/12/2020"
                        },
                        imageSrc2: ""
                    },
                    {
                        imageSrc: "~/assets/milk.png",
                        desc: {
                            name: "20% Reduction on Milk !",
                            date: "On 26/12/2020"
                        },
                        imageSrc2: ""
                    },
                    {
                        imageSrc: "~/assets/milk.png",
                        desc: {
                            name: "20% Reduction on Milk !",
                            date: "On 26/12/2020"
                        },
                        imageSrc2: ""
                    }
                ]
            },
            {
                notify_time: "This Week",
                notify_list: [
                    {
                        imageSrc: "~/assets/milk.png",
                        desc: {
                            name: "20% Reduction on Milk !",
                            date: "On 26/12/2020"
                        },
                        imageSrc2: ""
                    },
                    {
                        imageSrc: "~/assets/milk.png",
                        desc: {
                            name: "20% Reduction on Milk !",
                            date: "On 26/12/2020"
                        },
                        imageSrc2: ""
                    }
                ]
            },
            {
                notify_time: "This Month",
                notify_list: [
                    {
                        imageSrc: "~/assets/milk.png",
                        desc: {
                            name: "William, and Pavlo ",
                            content: "shared 20 photos. ",
                            date: "1w"
                        },
                        imageSrc2: ""
                    },
                    {
                        imageSrc: "~/assets/milk.png",
                        desc: {
                            name: "Pavlo, and kumaran ",
                            content: "shared 10 photos. ",
                            date: "3w"
                        },
                        imageSrc2: ""
                    }
                ]
            }
        ]
    }
    //END TEST DATA
    lng:string;
    filteredProducts:any=[];
    suby: boolean = false;
    prody: boolean = false;
    showProd: boolean = false;
    preCommands: any;
    searchPhrase:string;
    commandName:string=""
    products: any[] = [];
    pub: any;
    general:any;
    chosenProducts: any;
    subies: any;
    view: StackLayout;
    index = 0;
    indexSub = 0;
    isSelected: string = '1';
    lng_drapeau: boolean = true;
    user: any;
    pass: string = "";
    passes: any;
    prodMsg: string;
    command_products: ItemCommande[] = new Array();
    commandLength: number = 0;
    commandTotal: number = 0;
    pastCommands: any;
    isPre:boolean=false;
    zone: string = "";
    savedCommand:any;
    edit: boolean = false;
    private _mainContentText: string;
    @ViewChild(RadSideDrawerComponent, { static: true }) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    constructor(private page: Page, private categorieService: CategorieService,
        private productService: ProductsService, private userService: UserService,
        private adsService: AdsService, private cd: ChangeDetectorRef, private _datePipe: DatePipe
        , private precommandService: PrecommandService,
        private formatPipe: FormatPipe, private http: HttpClient,
        private commandService: CommandService, private passService: PassesService,
        private generalService:GeneralService,private translate:TranslateService) {
        this.translate.use(device.language.split("-")[0])
    }
    ngOnInit() {
        this.getDeviceLocation();
        this.mainContentText = "context";
        /**Below : Saved cart, when user leaves the app current cart products must be saved
         * I tried to save it in local storage when ng on destroy then getting it back it didn't work
         */
        //this.userService.emptyCommandData();
        //this.userService.getCommandData();
        if(this.userService.getCommandData()!=null)
        {
        this.command_products=JSON.parse(this.userService.getCommandData());
        this.commandLength=this.command_products.length;
        this.commandTotal=this.calculTotal()
        }else{

            this.savedCommand=this.command_products;
        }

        /**
         * For now i'm getting all the data here, once in deployement, you will have
         * to get all data from server with forkJoin and store it in local storage
         * Like that, we won't fetch database each time
         * And if user don't have internet add layout You have no internet
         */
        this.categorieService.getCategories().subscribe((res: any) => {
            if (res.success) {
                this.categories = res.obj;
            } else {
                //snack bar problem loading data
                var toast = Toast.makeText("Problem loading data check internet");
                toast.show();
            }
        })
        this.productService.getProducts().subscribe((res: any) => {
            if (res.success) {
                console.log("hel")
                this.products = res.obj;
            } else {
                //snack bar problem loading data
                var toast = Toast.makeText("Problem loading data check internet");
                toast.show();
            }
        })
        //Get publicité
        this.adsService.getAds().subscribe((res: any) => {
            if (res.success) {
                this.pub = res.obj[0];
            }else{
                var toast = Toast.makeText("Problem loading data check internet");
                toast.show();
            }
        })
        
        this.user = this.userService.getUserData();
        this.zone = this.user.zone;
        this.lng=this.user.prefered_lng;
        //Getting past commands of user
        this.commandService.getCommandByUserId(this.user.id).subscribe((res: any) => {
            this.pastCommands = res;
        },(err)=>{
            var toast = Toast.makeText("Problem loading data check internet");
                toast.show();
        }
        )
        //Getting user prepared commands
        this.precommandService.getPrecommand(this.user.id).subscribe((res: any) => {
            if (res.success) {
                this.preCommands = res.obj;
            } else {
                var toast = Toast.makeText("Problem loading data check internet");
                toast.show();
            }
        })
        //Getting user generated vip passes
        this.passService.getPassByCreator(this.user.id).subscribe((res: any) => {
            if (res.success) {
                this.passes = res.obj;
            } else {
                var toast = Toast.makeText("Problem loading data check internet");
                toast.show();
            }
        })
        //Getting opening time and closing time and list of locations eli yekhdmou aalehom
        this.generalService.getGeneral().subscribe((res:any)=>{
           if(res.success)
           {
               this.general=res.obj[0];
               console.log(this.general)
           }else{
            var toast = Toast.makeText("Problem loading data check internet");
            toast.show();
           }
        })
    }
    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.cd.detectChanges();
    }
    ngOnDestroy(): void {
        console.log("destroy called")
        //Saving current command in localstorage (not working)
        if(this.command_products && this.command_products.length > 0)
        {
            console.log("saved command")
           this.userService.storeCommandData(this.command_products);
           console.log(this.userService.getCommandData())
        }
    }

    setSavedCommand()
    {
        if(this.savedCommand && this.savedCommand.length>0)
        {
            this.command_products=this.savedCommand;
            this.isSelected = '7';
            this.selectedRoute = 'confirm';
        }else if(this.command_products && this.command_products.length>0)
        {
            this.isSelected = '7';
            this.selectedRoute = 'confirm';
        }
    }

   /**DRAWER CODE START (SIDE NAVIGATION) */
    get mainContentText() {
        return this._mainContentText;
    }

    set mainContentText(value: string) {
        this._mainContentText = value;
    }

    public openDrawer() {
        this.drawer.toggleDrawerState();
    }

    public closeDrawer() {
        this.drawer.closeDrawer();
    }
    onNavtap(route: string, selectedTab: string) {
        this.closeDrawer();
        this.isSelected = selectedTab;
        this.selectedRoute = route;
        if (this.selectedRoute === "command") {
            if (this.categories) {
                this.subies = this.categories[this.categories.length - 1];
                this.index = this.categories.length - 1;
                if (this.subies.subcats[0].products) {
                    this.showProd = true;
                    console.log(this.subies.subcats[0].products)
                    this.chosenProducts = this.products.filter(x => this.subies.subcats[0].products.findIndex(item => item.product === x._id) != -1);
                } else {
                    this.chosenProducts = [];
                    this.prodMsg = "No products in this categorie"
                }
                this.suby = !this.suby;
                this.prody = !this.prody;
            }
        }
        this.cd.detectChanges();
    }
    /**END NAVIGATION CODE */
    /**ON LANGUAGE CHANGE CHECKED */
    onCheckedChange(args: EventData) {
        let sw = args.object as Switch;
        let isChecked = sw.checked;
        this.lng_drapeau = isChecked;
        if (isChecked) {
            //savedValues.getInstance().setLang("en");
            this.lng = "en";
            this.translate.use(this.lng);
            
            console.log("hello")

        } else {
            this.lng = "fr";
            //savedValues.getInstance().setLang("fr");
            this.translate.use(this.lng);
        }

    }
    /**END ON LANGUAGE CHANGE */

    /**PRODUCTS CODE AND BUYING PROCESS */
    showSub(item, i) {
        this.prody = false;
        this.subies = item;
        this.index = i;
        this.chosenProducts = [];
        this.showProducts(0, this.subies.subcats[0]);

    }
    showProducts(i, sub) {

        this.indexSub = i;
        this.showProd = !this.showProd;
        if (sub.products) {
            this.chosenProducts = this.products.filter(x => sub.products.findIndex(item => item.product === x._id) != -1);
        } else {
            this.chosenProducts = [];
            this.prodMsg = "No products in this categorie"
        }

        this.prody = !this.prody;
    }  
    addProduct(item, isConfirm) {
        if (!isConfirm) {
            const resultat = this.command_products.findIndex(prod => prod.product === item._id);
            if (resultat != -1) {
                this.command_products[resultat].prod_qte += 1;
                this.commandTotal = this.calculTotal();

            } else {
                this.command_products.push({
                    product: item._id,
                    prod_name: item.name,
                    prod_qte: 1,
                    prod_stock: item.qteStock,
                    prod_seuil: item.seuilStock,
                    prod_unit_price: item.prix_u,
                    prod_image: item.imageSrc
                })
                this.commandLength = this.command_products.length;
                this.commandTotal = this.calculTotal();
            }
        } else {
            const resultat = this.command_products.findIndex(prod => prod.product === item.product);
            if (resultat != -1) {
                this.command_products[resultat].prod_qte += 1;
                this.commandTotal = this.calculTotal();
            } else {
                this.command_products.push({
                    product: item._id,
                    prod_name: item.name,
                    prod_qte: 1,
                    prod_stock: item.qteStock,
                    prod_seuil: item.seuilStock,
                    prod_unit_price: item.prix_u,
                    prod_image: item.imageSrc
                })
                this.commandLength = this.command_products.length;
                this.commandTotal = this.calculTotal();
            }
        }
    }
    calculTotal() {
        var tot = 0;
        for (let i = 0; i < this.command_products.length; i++) {
            tot += (this.command_products[i].prod_qte * this.command_products[i].prod_unit_price);
        }
        return tot;
    }
    returnQte(item) {
        const resultat = this.command_products.findIndex(prod => prod.product === item._id);
        if (resultat != -1) {
            return this.command_products[resultat].prod_qte;
        } else {
            return 0;
        }
    }
    deleteProduct(item) {

        const resultat = this.command_products.findIndex(prod => prod.product === item.product);
        if (resultat != -1) {
            this.command_products.splice(resultat, 1);
            this.commandLength = this.command_products.length;
            this.commandTotal = this.calculTotal();
        }
    }
    retrieveProduct(item, isConfirm) {
        if (!isConfirm) {
            const resultat = this.command_products.findIndex(prod => prod.product === item._id);
            if (resultat != -1) {
                if (this.command_products[resultat].prod_qte > 1) {
                    this.command_products[resultat].prod_qte -= 1;
                    this.commandTotal = this.calculTotal();

                } else {
                    this.command_products.splice(resultat, 1);
                    this.commandLength = this.command_products.length;
                    this.commandTotal = this.calculTotal();
                }
            }
        } else {
            const resultat = this.command_products.findIndex(prod => prod.product === item.product);
            if (resultat != -1) {
                if (this.command_products[resultat].prod_qte > 1) {
                    this.command_products[resultat].prod_qte -= 1;
                    this.commandTotal = this.calculTotal();

                } else {
                    this.command_products.splice(resultat, 1);
                    this.commandLength = this.command_products.length;
                    this.commandTotal = this.calculTotal();
                }
            }
        }
    }
    //SEARCH BAR START
    onSubmit(args) {
        const searchBar = args.object as SearchBar;
        console.log(`Searching for ${searchBar.text}`);
        this.filteredProducts=this.products.filter(x=> x.name.indexOf(searchBar.text)!=-1)
        console.log(this.filteredProducts);
        this.cd.detectChanges();
    }
    onTextChanged(args) {
        const searchBar = args.object as SearchBar;
        console.log(`Input changed! New value: ${searchBar.text}`);
        this.filteredProducts=this.products.filter(x=> x.name.indexOf(searchBar.text)!=-1)
        console.log(this.filteredProducts);
        this.cd.detectChanges();
    }
    onClear(args) {
        const searchBar = args.object as SearchBar;
        console.log(`Clear event raised`);
        this.filteredProducts=[];
        this.cd.detectChanges();
    }
    //SEARCH BAR END
    passCommand() {

        if (this.command_products && this.command_products.length > 0) {
            if(this.commandTotal > 15000)
            {
            this.isSelected = '7';
            this.selectedRoute = 'confirm';
            }else{
                var toast = Toast.makeText("Le Montant doit être supérieur a 15DT !");
                toast.show();
            }
        } else {
            var toast = Toast.makeText("La liste est vide");
            toast.show();
            
        }
    }
    //SET COMMAND FROM CONFIRM TO SEND
    setCommand() {
        this.isSelected = '8';
        this.selectedRoute = 'last';
        this.command = {
            user: {
                id: this.user.id,
                exact_adress: this.user.exact_adress,
                command_no: this.user.command_no,
                client_number: this.user.phone_number,
                client_name: this.user.fname + " " + this.user.lname,
                client_zone: this.zone
            },
            isPromotion: false,
            products: this.command_products,
            name: "Command_" + this.user.command_no + "_" + this._datePipe.transform(new Date(), "yyyy-MM-dd"),
            promotion_code: "",
            request: "",
            total: this.commandTotal,
            chosenTime: "",
            products_no: this.commandLength,
            canceled: false,
            delievered: false,
            enCours: true
        }
        if(this.isPre && this.commandName.length>0)
        {
            this.command.name=this.commandName;
        }else{
            this.command.name="Command_" + this.user.command_no + "_" + this._datePipe.transform(new Date(), "yyyy-MM-dd")
        }
    }
    sendCommand() {
        if(this.command.exact_adress.length>0 && this.command.user.client_number.length>0)
        {
           this.commandService.ajouterCommande(this.command).subscribe((res:any)=>{
                if(res.success)
                {
                    var toast = Toast.makeText("Command has been passed ! You will be contacted soon");
                    toast.show();
                }else{
                    var toast = Toast.makeText("Problem adding command !");
                    toast.show();
                }
           })
        }else{
            var toast = Toast.makeText("Adress must be complete!");
                    toast.show();
        }
    }
    //PICKING COMMAND TIME (BUG, time must be between opening and closing hour otherwise command not pass)
    public onSelectedIndexChanged(args: EventData) {
        const picker = <ListPicker>args.object;
        //picker.selectedIndex
        //hours: Array<String> = ["15min", "30min", "1 Heure", "2 Heures", "3 Heures"]
        let opening = new Date();
        opening.setHours(this.general.opening_hour.substr(0,2))
        opening.setMinutes(this.general.opening_hour.substr(3,5))
        console.log("Opening settings"+opening)
        //let closing=new Date('12/31/1899'+this.general.closing_hour);
        let closing
        if(this.isMidnight(this.general.closing_hour))
        {
            closing=new Date();
            closing.setHours(0,0,0,0)
            console.log("Closing settings"+closing)
        }else{
            closing=new Date();
            closing.setHours(this.general.closing_hour.substr(0,2))
            closing.setMinutes(this.general.closing_hour.substr(3,5))
        }
        let x:Date=new Date()
        switch(picker.selectedIndex)
        {
            case 0:
                x.setMinutes(x.getMinutes()+15);   
                console.log(x);  
                this.command.chosenTime=x; 
                break;
            case 1:
                x.setMinutes(x.getMinutes()+30);
                this.command.chosenTime = x;
                break;
            case 2:
                x.setHours(x.getHours()+1);
                this.command.chosenTime = x;
                break;   
            case 3:
                x.setHours(x.getHours()+2);
                this.command.chosenTime = x;
                break;
            case 4:
                x.setHours(x.getHours()+3);
                this.command.chosenTime = x;
                break;             
        }
        if(this.command.chosenTime<opening && this.command.chosenTime>closing)
        {
            
            console.log("est ok")
        }else{
            console.log("Chosin settings"+this.command.chosenTime)
            console.log("not ok")
        }
    }
    //Verify location depending on user current location and their list of locations they work on (not done)
    verifyLocation() {
        return true;
    }
    /**END BUYING PROCESS */




    /**Prepared command process ( delete & set current command as the prepared command, user can set command name*/
    
    deleteCommand(command)
    {
        this.precommandService.deletePrecommand(command._id).subscribe(res=>{
            const resultat = this.preCommands.findIndex(command => command._id === command._id);
           
                    this.preCommands.splice(resultat, 1);
                
        })
    }
    preCommand(command)
    {
        this.isPre=true
        if(command==0)
        {
            this.isSelected = '7';
            this.selectedRoute = 'command';
            if (this.categories) {
                this.subies = this.categories[this.categories.length - 1];
                this.index = this.categories.length - 1;
                if (this.subies.subcats[0].products) {
                    this.showProd = true;
                    console.log(this.subies.subcats[0].products)
                    this.chosenProducts = this.products.filter(x => this.subies.subcats[0].products.findIndex(item => item.product === x._id) != -1);
                } else {
                    this.chosenProducts = [];
                    this.prodMsg = "No products in this categorie"
                }
                this.suby = !this.suby;
                this.prody = !this.prody;
            }
        }else{
          if(command.products && command.products.length>0)
          {
            this.command_products=command.products;
            this.isSelected = '7';
            this.selectedRoute = 'confirm';

          }else{
            if (this.categories) {
                this.subies = this.categories[this.categories.length - 1];
                this.index = this.categories.length - 1;
                if (this.subies.subcats[0].products) {
                    this.showProd = true;
                    console.log(this.subies.subcats[0].products)
                    this.chosenProducts = this.products.filter(x => this.subies.subcats[0].products.findIndex(item => item.product === x._id) != -1);
                } else {
                    this.chosenProducts = [];
                    this.prodMsg = "No products in this categorie"
                }
                this.suby = !this.suby;
                this.prody = !this.prody;
            }
            this.isSelected = '7';
            this.selectedRoute = 'command';
          }
        }
    }
  /**END PREPARED COMMAND */

    
  //USER UPDATE (Missing user picture update (done in back end with multer))
    updateUser() {
        this.userService.updateUser(this.user, this.user.id).subscribe((res: any) => {
            var toast = Toast.makeText("Success updating user !");
            toast.show();
        },(err)=>{
            var toast = Toast.makeText("Error updating user");
            toast.show();
        })
    }


    
//GENERATING REFERAL PASS and copying it to clipboard
    generatePass() {
        let x = this.passes.filter(x => x.isActive);
        if (x.length <= 0) {
            this.passService.ajouterPass({ creator: this.user.id }).subscribe((res: any) => {
                if (res.success) {
                    this.pass = res.obj;
                    var toast = Toast.makeText("Pass has been generated !");
                    toast.show();
                } else {
                    var toast = Toast.makeText("Try again later !");
                    toast.show();
                }
            })
        } else {
           //Toast you already have an active pass
           var toast = Toast.makeText("You already have an active pass");
           toast.show();
        }
    }
    savePass()
    {
        clipboard.setText(this.pass).then(function() {
            var toast = Toast.makeText("Copied to clipboard !");
           toast.show();

        
        })
      
    }

    //GETTING USER DEVICE LOCATION WITH REVERSE GEOCODING LAT AND LNG
    private getDeviceLocation(): Promise<any> {
        return new Promise((resolve, reject) => {
            Geolocation.enableLocationRequest().then(() => {
                Geolocation.getCurrentLocation({ timeout: 10000 }).then(location => {
                    this.http.get("http://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" + location.latitude + "&longitude=" + location.longitude + "&localityLanguage=fr").subscribe((data: any) => {
                        if (data.locality) {
                            this.zone = data.locality;
                        }
                    })
                    resolve(location);
                }).catch(error => {
                    reject(error);
                });
            });
        });
    }





    //UTILITIES
    formatUserNumber(num) {
        return this.formatPipe.transform(num);
    } 
    isMidnight(str:string)
    {
        let h=str.substr(0,2);
        if(Number(h)==24)
        {
            return true;
        }else{
            return false;
        }
    }
}