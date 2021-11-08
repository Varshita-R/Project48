class Form{
    constructor(){
        this.input = createInput("Name");
       this.button = createButton("Play");
    }
    hide(){
        this.input.hide();
        this.button.hide();
    }
    display(){
        background("#157b9a");
        this.input.position(380,300);
        this.button.position(380,340);
        this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();
            playerName = this.input.value();
            gamestate=1;
        })
    }
}