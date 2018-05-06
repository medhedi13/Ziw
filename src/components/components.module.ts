import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar';
import { EmojiPickerComponent } from './emoji-picker/emoji-picker';
@NgModule({
	declarations: [SidebarComponent,
    EmojiPickerComponent],
	imports: [],
	exports: [SidebarComponent,
    EmojiPickerComponent]
})
export class ComponentsModule {}
