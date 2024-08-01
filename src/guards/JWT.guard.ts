import { CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import { Observable, of, Subscriber } from "rxjs";
import { HttpService } from "@nestjs/axios";
import 'dotenv'
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JWT implements CanActivate {

    constructor(private readonly http: HttpService, private readonly config: ConfigService) { }

    canActivate(context: ExecutionContext): Observable<boolean> {
        const url = this.config.get("AUTH_URL") + "/auth/validate";

        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if(!authHeader){
            return of(false);
        }

        const authReqObs = this.http.post(url, {}, {
            headers: { Authorization: authHeader }
        });

        return new Observable<boolean>((subscriber: Subscriber<boolean>)=>{
            authReqObs.subscribe({
                next: response => {
                    subscriber.next(true);
                    subscriber.complete();
                },
                error: error => {
                    subscriber.error(new UnauthorizedException('Unauthorized'));
                }
            })
        })
    }
}