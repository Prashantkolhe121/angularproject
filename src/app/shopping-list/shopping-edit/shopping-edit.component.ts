import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  
 
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy{
 
  @ViewChild('f')slForm:NgForm;
 subscription:Subscription; 
 editMode = false;
 editedItemIndex:number;
 editedItem:Ingredient; 
  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
   this.subscription =  this.slService.startedEditing.subscribe(
     (index:number)=>{
      this.editedItemIndex = index;
       this.editMode = true;
       this.editedItem = this.slService.getIngredient(index);
       this.slForm.setValue(
         {
           name:this.editedItem.name,
           amount:this.editedItem.amount
          }
       )
     }
   );
  }

  onSubmit(form:NgForm) {
     const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
   // this.ingredientAdded.emit(newIngredient);
     if(this.editMode)
     {
       this.slService.updateIngredient(this.editedItemIndex,newIngredient);
     }
     else
     {
      this.slService.addIngredient(newIngredient);
     }
     this.editMode = false;
     form.reset();
 }
 onClear()
 {
   this.slForm.reset();
   this.editMode = false; 
 }
 onDelete()
 {
   this.onClear();
   this.slService.deleteIngredient(this.editedItemIndex);
 }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}