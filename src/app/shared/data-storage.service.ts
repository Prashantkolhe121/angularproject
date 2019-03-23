import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipes.service";
import { Recipe } from "../recipes/recipe.model";
import 'rxjs/Rx' ;
import  * as firebase  from 'firebase/app';
import { RecipesComponent } from "../recipes/recipes.component";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService
{
   constructor(private http:Http,
    private recipeService:RecipeService,
    private authService:AuthService){}
    storeRecipes()
    {
     return  this.http.put('https://recipeproject-c3d91.firebaseio.com/recipes.json',
       this.recipeService.getRecipes());
    }
    getRecipes()
    { 
       const token =  this.authService.getToken();
        this.http.get('https://recipeproject-c3d91.firebaseio.com/recipes.json?auth='+token).
        map(
         (response:Response) =>{
            const  recipes: Recipe[]= response.json();
            for(let recipe of recipes)
            {
                if(!recipe['ingredients'])
                {   console.log(recipe);
                    recipe['ingredients']=[];
                }
            } 
            return recipes;
        }  )  
       
        .subscribe(
            (recipes:Recipe[]) => {
               
                this.recipeService.setRecipes(recipes);
            }
        )
    }
 
}