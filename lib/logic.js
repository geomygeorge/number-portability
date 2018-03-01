'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.geomy.mnp.ChangeCarrier} userInfo
 * @transaction
 */
function onChangeCarrier(userInfo) {
    var assetRegistry;
    var id = userInfo.mobileNumber;

    var MIN_DAYS_INCORPORATED = 90;

    return getAssetRegistry('org.geomy.mnp.NumberPortingCase')
        .then(function (ar) {
            assetRegistry = ar;
            return assetRegistry.get(id);
        })
        .then(function (asset) {

            var daysOfIncorporation = asset.daysOfIncorporation;
            var dues = asset.dues;
            var receiverOp = asset.recepientOperator;

            if (daysOfIncorporation  <  MIN_DAYS_INCORPORATED) {

                throw new Error('Number portability denined. Days of incorporation not meeting the guidelines!')

            } else if (dues === true) {

                throw new Error('Number portability denined. Kindly clear your dues!')
            } else {

                asset.donorOperator = receiverOp;
                return assetRegistry.update(asset);
            }

        });
}

/**
 * Sample transaction
 * @param {org.geomy.mnp.UpdateCustomerDetails} userInfo
 * @transaction
 */

function onUpdateCustomerDetails(userInfo) {

    var assetRegistry;
    var id = userInfo.mobileNumber;

    return getAssetRegistry('org.geomy.mnp.NumberPortingCase')
        .then(function (ar) {
            assetRegistry = ar;
            return assetRegistry.get(id);
        })
        .then(function (asset) {


            var days = {};
            var dues = false;

            asset.daysOfIncorporation = days;
            asset.daysOfIncorporation = userInfo.daysOfIncorporation;
            asset.dues = userInfo.dues;
            return assetRegistry.update(asset);


        });
}