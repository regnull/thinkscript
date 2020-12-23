# ExpWeightedHV
# This study computes the exponential weighted historical volatility as defined in
# The Complete Guide to Option Pricing Formulas, Espen Gaarder Haug, PhD,
# page 449
#
# Copyright (c) 2020 Leonid Gorkin
# regnull@gmail.com
#
# MIT Licence https://opensource.org/licenses/MIT
declare lower;
declare hide_on_intraday;
input length = 20;
input lambda = 0.94;

def logClose = log(close/close[1]);
def sigma = sqrt(lambda*sigma[1]*sigma[1] + (1-lambda)*logClose*logClose);
def vol = sigma*sqrt(252);
plot ExpWeightedHV = vol;