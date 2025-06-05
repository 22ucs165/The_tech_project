const mongoose  = require("mongoose");

// const deviceSchema = mongoose.Schema({
//     title:String,
//     category:String,
//     brand:String,
//     price:Object,
//     colors:Object,
//     images:Array,
//     family:Array,
//     body:Array,
//     display:Array,
//     platform:Array,
//     memory:Array,
//     maincamera:Object,
//     selfiecamera:Object,
//     sound:Array,
//     communication:Object,
//     features:Array,
//     sensors:Array,
//     battery:Array,
//     misc:Array,
//     package:Array,
//     highlights:Array,
//     filter:{
//         brand:{type:String, default:""},
//         range:{type:String, default:""},
//         category:{type:Array, default:[]},
//         processor:{type:String, default:""},
//         ram:{type:Array, default:[]},
//         storage:{type:Array, default:[]},
//         display_type:{type:String, default:""},
//         display_size:{type:String, default:""}
//     }
// })

const deviceSchema = mongoose.Schema({
    title:String,
    category:String,
    brand:String,
    price_range:String,
    colors:Array,
    images:Object,
    family:String,
    performance:{
        operating_system:String,
        sensors:Array,
        processor:Array,
        storage:Array,
        RAM:Array
    },
    battery:{
        battery_size:String,
        charging:String,
        battery_life:String
    },
    display:{
        display_size:String,
        resolution:String,
        display_technology:Array,
        refresh_rate:Array,
    },
    design:{
        size:String,
        dimensions:String,
        body:String,
        weight:String,
        protection:Array
    },
    camera:{
        rear_camera_hardware:Array,
        rear_camera_software:Array,
        front_camera_hardware:Array,
        front_camera_software:Array,
        flash:String
    },
    audio:{
        sprakers:String,
        headphone_jack:String,
        FM_radio:String
    },
    experiences:Object,
    connectivity:{
        network_bands:Object,
        bluetooth_technology:String,
        NFC:String,
        wifi:String,
        location_services:Array,
        sim_card:String
    },
    in_the_box:{
        device:String,
        components:Array
    },
    misc:Object
})

const deviceModel = mongoose.model("devices",deviceSchema);

module.exports = {
    deviceModel
}