import { map, first } from 'lodash'
import { Injectable } from '@angular/core'

declare var $: any;

@Injectable()
export class NotificationHelper {
    success(message) {
        $.notify({ message }, { type: 'success', placement: { from: 'top', align: 'right' } });
    }

    error(message) {
        $.notify({ message }, { type: 'danger', placement: { from: 'top', align: 'right' } });
    }

    httpErrorHandler(error) {
    	let messageList = [error.message]

    	if (error.errors) {
    		map(error.errors, (msgs, field) => messageList.push(first(msgs)))
    	}

    	const message = messageList.join('<br />')

        $.notify({ message }, { type: 'danger', placement: { from: 'top', align: 'right' } });
    }
}