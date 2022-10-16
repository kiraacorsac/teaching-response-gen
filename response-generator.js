

let you = {
    hi: c =>  c.formal ? "Dobrý deň" : "Ahoj",
    dativ: c =>  c.formal ? "vám" : "ti",
    want: c=> c.formal ? "chcete" : "chceš"
}

let experience_texts = {
    work: "z práce",
    taught: "z výuky na univerzite",
    personal: "z veľkého množstva osobných projektov"
}

let questions_texts =  [
    {
        name: "previous",
        shorthand: "Predchádzajúce skúsenosti?",
        text: "Aké sú tvoje predchádzajúce skúsenosti s programovaním (aj v inom jazyku)?",

    },
    {
        name: "concepts",
        shorthand: "Čo prebrať?",
        text: "Mohol by si mi priblížiť témy a koncepty ktoré by si rád so mnou prebral?",
    },
    {
        name: "project",
        shorthand: "O čom projekt?",
        text: "Mohol by si mi priblížiť čoho by sa týkal projekt na ktorom by sme spolu pracovali?",
    },
    {
        name: "materials",
        shorthand: "Máš materiály?",
        text: "Máš nejaké konkretné materiály čo si chceš so mnou prejsť, alebo si mám niečo pripraviť?",
    },        
]

function getExperience(c){
    let experience = c.experience.map(e => experience_texts[e]);
    if(experience.length > 1){
        tail_experience = experience.slice(1).join(", ");
        experience = [tail_experience, experience[0]].join(" a tiež ");
    } 
    if(experience.length > 0){
        experience = `Mám s ním skúsenosti ${experience}.`
    }

    return experience;
}

function getQuestions(c){
    let questions = c.questions.map(q => c.question_texts.find(t => t.name == q).text);
    questions = questions.length == 0 ? "" : "\n" + questions.join("\n") + "\n";

    return questions;
}

function make_message(){
    let c = controls.$data;
    let {name, force_informal, date, price, hour, double} = c;
    let intro = `${you.hi(c)} ${name}${force_informal ? " (snáď si môžme tykať :))" : ""},\ns jazykom ${c.topic} ${you.dativ(c)} určite viem pomôcť. ${getExperience(c)}`
    
    let questions = getQuestions(c);
    
    let details = `Keďže som momentálne dlhodobo v Brne, výuka by prebiehala cez Skype, Discord, prípadne iný komunikátor so zdieľaním obrazovky. Cena by bola ${price} Eur na 60 minút. Obvykle som k dispozícií poobedné a večerné hodiny každý pracovný deň, po dohode aj cez víkendy. Ak by ${you.dativ(c)} to vyhovovalo, môžme začať už ${date}, napríklad o ${hour}.`;
    
    details += double ? ` Ak ${you.want(c)} intenzívnejšiu výuku, môžme dať rovno dvojhodinovku :)\n` :`\n`;

    let bye = `Teším sa na našu spoluprácu,\nFilip`

    return `${intro}\n${questions}\n${details}\n${bye}`
}


let controls = new Vue({
    el: '#controls',
    data: {
        name: '',
        topic: '',
        formal: false,
        force_informal: false,
        experience: ["personal"],
        questions: [],
        price: 18,
        date: "",
        hour: "",
        double: true,
        question_texts: questions_texts,
    }
})


let generated_vm = new Vue({
    el: '#generated',
    computed: {
        response: make_message
    }
});
