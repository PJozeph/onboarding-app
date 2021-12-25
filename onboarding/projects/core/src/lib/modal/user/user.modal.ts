
export class User {
    constructor(public uid : string,
                public stripeUid : string,
                public displayName : string, 
                public imagePath: string,
                public token? : string) {}
}