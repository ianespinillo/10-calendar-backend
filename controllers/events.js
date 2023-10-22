
const {response} = require('express');
const Event = require('../models/Event');

const getEventos = async (req, res= response) => {

    const events = await Event.find().populate('user','name')

    res.json({
        ok:true,
        events
    });
}

const createEvents = async (req, res=response) => {

    
    const evento = new Event(req.body)

    try {
        evento.user= req.uid
        const event= await evento.save();
        res.json({
            ok:true,
            evento: event
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const updateEvents = async (req, res=response) => {
    const eventId = req.params.id
    const uid = req.uid
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found'
            });
        }
        if(event.user.toString() != uid){
            return res.status(404).json({
                ok: false,
                msg: 'Not authorized to modify this event'
            });
        }
        const newEvent ={
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent,{new: true});
        res.json({
            ok: true,
            evento: eventUpdated
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
    
}

const deleteEvent = async (req, res=response) => {
    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found'
            });
        }
        if(event.user.toString() != uid){
            return res.status(404).json({
                ok: false,
                msg: 'Not authorized to delete this event'
            });
        }
        await Event.findByIdAndDelete(eventId);
        res.json({ok: true});

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getEventos,
    createEvents,
    updateEvents,
    deleteEvent
}   