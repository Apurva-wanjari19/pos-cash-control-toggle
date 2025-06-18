/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PosStore } from "@point_of_sale/app/store/pos_store";

patch(PosStore.prototype, {
    async _processData(loadedData) {
        await super._processData(...arguments);
        console.log("Loaded POS Config fields:", this.config);
    },

    openCashControl() {
        // Prevent popup only if the flag is explicitly set true
        if (
            this.config.cash_control &&
            this.pos_session.state === "opening_control"
        ) {
            if (!this.config.hide_opening_cash_control) {
                // Just trigger the standard popup via the original method
                // DO NOT manually add popup key
                super.openCashControl?.();
            } else {
                // Log or silently skip
                console.log("Opening cash control skipped due to config.");
            }
        }
    },
});
