import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Camera } from '@ionic-native/camera/ngx';

import { SharedModule } from '../shared/shared.module';

import { AuditPageRoutingModule } from './audit-routing.module';

import { AuditPage } from './audit.page';

@NgModule({
	providers: [Camera],
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		AuditPageRoutingModule,
		SharedModule
	],
	declarations: [AuditPage]
})
export class AuditPageModule {
	base64Images: string[];
	
	constructor(private camera: Camera) {
		
	}
	
	submit() {
        this.itemRef.update({
            ...this.model,
            photos: this.base64Images,
            status: this.form.invalid ? 'incomplete' : 'complete',
        });
        this.router.navigateByUrl('/home');
    }

	
	openCamera() {
        const options: CameraOptions = {
            quality: 100,
            cameraDirection: this.camera.Direction.BACK,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((imageData) => {
            this.base64Images.push(`data:image/jpeg;base64,${imageData}`);
        });
    }
	
}
