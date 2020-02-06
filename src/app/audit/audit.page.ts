import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Router, ActivatedRoute } from '@angular/router';
import { IAppointment } from '../appointment.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import startCase from 'lodash-es/startCase';

const getFields = (id: number, key: string): FormlyFieldConfig[] => {
	const label = startCase(key);
	
	return [{
		key: `units.${id}.${key}`,
		type: 'radio',
		templateOptions: {
			required: true,
			label,
			options: [{
				value: 'good', label: 'In good condition'
			}, {
				value: 'bad', label: 'In bad condition'
			}]
		}
	}, {
		key: `units.${id}.${key}Reason`,
        type: 'textarea',
		hideExpression: `model.units[${id}].${key} !== 'bad'`,
        templateOptions: {
			required: true,
            label: 'Reason',
            placeholder: `Reason for bad condition of ${label}`
        }
	}];
};

const UNIT_KEYS = {
    'room': ['lights', 'blinds', 'paint', 'carpet', 'door', 'alarm'],
    'kitchen': ['sink', 'stove', 'microwave', 'fridge'],
    'bath': ['lights', 'paint', 'floor', 'door', 'knobs'],
    'hall': ['lights', 'paint', 'carpet', 'door'],
    'patio': ['clean']
};

const getUnitFields = (type: string, id: number): FormlyFieldConfig[] => {
    return [
        {
            template: `<h1>${startCase(type)}</h1>`,
        },
        ...UNIT_KEYS[type].flatMap(unitKey => {
            return getFields(id, unitKey);
        })
    ];
};

@Component({
  selector: 'app-audit',
  templateUrl: './audit.page.html',
  styleUrls: ['./audit.page.scss'],
})
export class AuditPage implements OnInit {
	itemRef: AngularFireObject<IAppointment>;
	
	form = new FormGroup({});
    options: FormlyFormOptions = {};
    model = {};
    fields: FormlyFieldConfig[] = [{
        type: 'input',
        key: 'name',
        templateOptions: {
            label: 'Name'
        }
    }];

	constructor(private db: AngularFireDatabase, private router: Router, private route: ActivatedRoute) { 
		const params = this.route.snapshot.params;
		this.itemRef = this.db.object<IAppointment>(`/appointments/${params.key}`);;
		
		this.itemRef.valueChanges().subscribe(appointment => {
            const fields = appointment.units.map((unit, index) => {
                return getUnitFields(unit.type, index);
            });
            // Flattening the fields array using reduce
            this.fields = fields.reduce((acc, e) => acc.concat(e), []);
            this.model = appointment;
        });
	}
	
	submit() {
		this.itemRef.update({
			...this.model,
			status: this.form.invalid ? 'incomplete' : 'complete',
		});
		
		this.router.navigateByUrl('/home');
	}

	ngOnInit() {
	}

}
