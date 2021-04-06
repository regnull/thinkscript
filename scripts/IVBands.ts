# IVBAnads
# 
# Shows bands separated by IV-implied stock movement as of some number of days ago.
#
# Copyright (c) 2020 Leonid Gorkin
# regnull@gmail.com
#
# MIT Licence https://opensource.org/licenses/MIT

input length = 20;

# Sigma factor depends on what kind of options we are modeling.
# We compute it from the probability we want (which roughly equals option delta) 
# using cumulative normal distribution function. 
# Unfortunately Thinkscript doesn't have cumululative normal distribution function, so
# here are some numbers to translate probabilities into sigma factors:

# Probability (Option delta)    Sigma factor
# 0.4                           0.25
# 0.3                           0.5
# 0.2                           0.8
# 0.1                           1.25

# Let's say we use sigma factor of 0.5, which translates into option delta of 0.3.
# If we were to sell a call with 0.3 delta 20 days ago, and the price today is below
# the top band, the option would not get assigned. If the price is above the top band,
# the option would get assigned.

# Same with puts and the bottom band.

input sigmaFactor = 0.5;

# Averaging length, just to make chart less jumpy.

input avg_length = 5;

def iv0 = imp_volatility();
def iv = if !IsNaN(iv0) then iv0 else iv0[-1];

def ivPast = iv[length]*Sqrt(length/365)*sigmaFactor;
def upperBand = MovingAverage(AverageType.Simple, close[length]*(1 + ivPast), avg_length);
def lowerBand =  MovingAverage(AverageType.Simple, close[length]*(1 - ivPast), avg_length);

plot UpperBandP = upperBand;
plot LowerBandP = lowerBand;
