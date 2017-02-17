/**
 * Created by daniellydon on 2/16/17.
 */
import {Pipe, PipeTransform} from "@angular/core";
@Pipe({name: 'groupBy'})
export class GroupByPipe implements PipeTransform{
    transform(value: Array<any>, field: string, shouldSort:boolean): Array<any>{
        const groupedObj = value.reduce((prev, cur)=>{
            if(!prev[cur[field]]){
                prev[cur[field]] = [cur];
            } else{
                prev[cur[field]].push(cur);
            }
            return prev;
        }, {});
        let finalArray = Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key]}));
        if(shouldSort) {
            return finalArray.sort((score1, score2) => {
                console.log(score1);
                if (parseInt(score1.key) > parseInt(score2.key)) {
                    return -1;
                }
                else if (parseInt(score2.key) > parseInt(score1.key)) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
        return finalArray;
    }
}