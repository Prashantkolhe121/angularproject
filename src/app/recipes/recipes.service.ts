import {Recipe} from './recipe.model'
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService
{  recipeChanged = new Subject<Recipe[]>();
   private  recipes: Recipe[] = [
        new Recipe('A Test Recipe', 
        'This is simply a test', 
        'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
        [new Ingredient('Meat',1),
         new Ingredient('French Fries',20)]),
        new Recipe('Another Test Recipe', 
        'This is simply a test', 
        'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
        [
            new Ingredient('Meat',1),
            new Ingredient('Bread',2)
        ])
      ]; 
      
      constructor(private slService:ShoppingListService){}
      getRecipes()
      {
          return this.recipes.slice();
      }
       getRecipe(index:number)
       {
         return this.recipes[index];
       }
      addIngredientsToShoppingList(ingredients:Ingredient[])
      {
         this.slService.addIngredients(ingredients);
      }
      addRecipe(recipe:Recipe)
      {
           this.recipes.push(recipe);
           this.recipeChanged.next(this.recipes.slice());
      }
      updateRecipe(index:number,newRecipe:Recipe)
      {
            this.recipes[index] = newRecipe;
            this.recipeChanged.next(this.recipes.slice());
           
      }
      deleteRecipe(index:number)
      {
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
      }

      setRecipes(recipes:Recipe[])
      {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
      }
}