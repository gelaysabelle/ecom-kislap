package com.stamaria.controller;
import org.springframework.web.bind.annotation.*;
import com.stamaria.model.AppDetail;

import java.util.List;
@RestController
public class AppDetailsController {
    public  List<AppDetail> getMainMenu(){
        List<AppDetail> appDetails = null;
        return appDetails;
    }
}
