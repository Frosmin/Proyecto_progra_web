import { Component, Input, Output, EventEmitter, ElementRef, Renderer2, OnInit } from '@angular/core';
import { PrefabComponent } from '../../Prefabs/prefab.component';
import { TextQuestionComponent } from '../../Prefabs/text-question/text-question.component';

@Component({
  selector: 'app-creator-button',
  standalone: true,
  template: `
    <button class="creational-btn" >{{ name }}</button>
  `,
  styleUrls: ['./component.button.css'],
})
export class CreatorButtonComponent implements OnInit {
  @Output() addPrefab = new EventEmitter<PrefabComponent>();
  @Input() name: string = 'Crear Prefab';
  @Input() buttonColor: string | null = null;
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  
  ngOnInit() {
    if (this.buttonColor) {
      const button = this.el.nativeElement.querySelector('.creational-btn');
      this.renderer.setStyle(button, 'background-color', this.buttonColor);
    }
  }



}
