# IVBAnads
# 
# Shows bands separated by IV-implied stock movement as of some number of days ago.
#
# Copyright (c) 2020 Leonid Gorkin
# regnull@gmail.com
#
# MIT Licence https://opensource.org/licenses/MIT

input length = 20;
input delta = {"10%", "20%", default "30%", "40%"};
input avg_length = 5;

# Sigma factor is the number we need to multiple sigma by to get ghe required
# probability, i.e. delta.
# The good way to do it would be to use cumulative normal distribution function,
# which is not available in ThinkScript, so we use a few pre-defined values.
def sigma_factor;
switch (delta) {
    case "10%":
        sigma_factor = 1.25;
    case "20%":
        sigma_factor = 0.85;
    case "30%":
        sigma_factor = 0.49;
    case "40%":
        sigma_factor = 0.24;
}

def iv0 = imp_volatility();
def iv = if !IsNaN(iv0) then iv0 else iv0[-1];

def ivPast = iv[length]*Sqrt(length/365)*sigma_factor;
def upperBand = MovingAverage(AverageType.Simple, close[length]*(1 + ivPast), avg_length);
def lowerBand =  MovingAverage(AverageType.Simple, close[length]*(1 - ivPast), avg_length);

plot UpperBandP = upperBand;
plot LowerBandP = lowerBand;
