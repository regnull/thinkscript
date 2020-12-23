# HighLowHV
# This study computes the High-Low Volatility for stock, as defined in 
# The Complete Guide to Option Pricing Formulas, Espen Gaarder Haug, PhD,
# page 447
#
# Copyright (c) 2020 Leonid Gorkin
# regnull@gmail.com
#
# MIT Licence https://opensource.org/licenses/MIT
declare lower;
declare hide_on_intraday;

input length = 20;

def highLowLog = log(high/low);
def highLowLogSum = sum(highLowLog, length);
def sigma = 1 / 2 / length / sqrt(log(2)) * highLowLogSum;
def vol = sigma * sqrt(252);
plot HighLowVolatility = vol;